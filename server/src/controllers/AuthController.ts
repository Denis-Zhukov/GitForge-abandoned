import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import {Account} from "../database/models/Account.ts";
import {Session} from "../database/models/Session.ts";
import {UserJwtPayload} from "../utils/types/UserJwtPayload.ts";
import {Op} from "sequelize";
import {Mailer} from "../services/Mailer.ts";
import {v4} from "uuid";
import {Confirmation} from "../database/models/Confirmation.ts";
import {ParamsUuid} from "./types/ParamsUuid.ts";
import {Role} from "../database/models/Role.js";
import {AccountRoles} from "../database/models/AccountRoles.js";
import {sequelize} from "../database/sequelize.js";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const LIFE_ACCESS_TOKEN = process.env.LIFE_ACCESS_TOKEN || '5 min';
const LIFE_REFRESH_TOKEN = process.env.LIFE_REFRESH_TOKEN || '30 days';

export class AuthController {
    public static async signUp(req: Request, res: Response) {
        //Check if there is data about the device
        if (!req.headers["user-agent"])
            return res.status(401).send({
                error: "Identification occurs from an unknown device",
                details: ["Identification occurs from an unknown device"]
            });

        let {username, password, email} = req.body;
        username = username.toLowerCase();
        email = email.toLowerCase();

        const t = await sequelize.transaction();

        try {
            const [userModel, built] = await Account.findOrBuild({
                where: {[Op.or]: [{username}, {email}]}
            });

            if (!built) {
                const user = userModel.get();
                const detail = user.username === username ?
                    `User with username '${username}' already exists` :
                    `User with email '${email}' already exists`

                return res.status(409).json({
                    error: "User already exists",
                    details: [detail]
                });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            userModel.set({
                username,
                passwordHash,
                email
            });

            const userRole = (await Role.findOne({where: {name: "user"}}))!;
            const account = await userModel.save();


            await AccountRoles.create({
                accountId: account.get().id,
                roleId: userRole.get().id
            });
            await t.commit();

            const uuid = v4();

            const instance = account.get();
            await Confirmation.create({uuid, userId: instance.id});

            await Mailer.sendEmailConfirmation(email, uuid);
            res.send({
                id: instance.id,
                email: instance.email,
                username: instance.username
            });
        } catch (e) {
            await t.rollback();
            res.sendStatus(401);
        }
    }

    public static async signIn(req: Request, res: Response) {
        //Check if there is data about the device
        if (!req.headers["user-agent"])
            return res.status(401).send({
                error: "Identification occurs from an unknown device",
                details: ["Identification occurs from an unknown device"]
            });

        let {username, password} = req.body;
        username = username.toLowerCase();

        try {
            const userModel = await Account.findOne({where: {username}});
            if (!userModel) return res.status(401).send({
                error: "No such user", details: [`Account "${username}" not found`]
            });

            const roles = (await userModel.getRoles()).map(role => role.get().name);
            const user = userModel.get();

            const correspond = await bcrypt.compare(password, user.passwordHash);
            if (!correspond) return res.status(401).send({
                error: "Wrong password", details: [`Wrong password`]
            });

            const confirmation = await Confirmation.findOne({where: {userId: user.id}});
            if (confirmation) return res.status(401).send({
                error: "Email not verified", details: [`To authorize, you must confirm your email`]
            });


            const refreshToken = jwt.sign({
                id: user.id, username: user.username, roles
            }, REFRESH_SECRET, {expiresIn: LIFE_REFRESH_TOKEN});
            const accessToken = jwt.sign({
                id: user.id, username: user.username, roles
            }, ACCESS_SECRET, {expiresIn: LIFE_ACCESS_TOKEN});

            const [session, built] = await Session.findOrBuild({
                where: {
                    accountId: user.id,
                    device: req.headers["user-agent"]!
                },
                defaults: {
                    accountId: user.id,
                    device: req.headers["user-agent"]!,
                    refreshToken,
                    lastAccess: new Date()
                }
            });

            session.set({
                refreshToken,
                lastAccess: new Date()
            })

            await session.save();

            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000
            }).send({access_token: accessToken, roles, username: user.username});
        } catch (e) {
            res.sendStatus(401);
        }
    }

    public static async refreshAccessToken(req: Request, res: Response) {
        try {
            const refreshToken = req.cookies.refresh_token;
            const user = <UserJwtPayload>jwt.verify(refreshToken, REFRESH_SECRET);

            const userModel = await Account.findByPk(user.id);
            if (!userModel) return res.status(400).send({
                error: "No such user", details: [`User with name "${user.username}" not found`]
            });

            const sessions = await userModel.getSessions();
            if (sessions.findIndex(s => s.get().refreshToken == refreshToken) === -1)
                return res.sendStatus(401);

            const accessToken = jwt.sign({
                id: user.id,
                username: user.username
            }, ACCESS_SECRET, {expiresIn: "5 min"});

            res.send({access_token: accessToken});
        } catch (e) {
            res.sendStatus(401);
        }
    }

    public static async logout(req: Request, res: Response) {
        const refreshToken = req.cookies.refresh_token;
        console.log("cookie", res.cookie)
        res.cookie('refresh_token', '', {expires: new Date(0)});
        try {
            const session = await Session.findOne({where: {refreshToken}})
            if (!session) return res.status(200).send("The token was withdrawn");
            await session.destroy();
            res.status(200).send("The token has been withdrawn");
        } catch (e) {
            res.status(500).send({error: "Problem deleting token", details: ["Problem deleting token"]});
        }
    }

    public static async verifyEmail(req: Request<ParamsUuid, {}, {}, {}>, res: Response) {
        try {
            const uuid = req.params.uuid;
            const confirmation = await Confirmation.findOne({where: {uuid}});
            if (!confirmation)
                return res.sendStatus(404);

            await confirmation.destroy();
            res.sendStatus(200);
        } catch (e) {
            res.status(500).send({error: "Problem deleting token", details: ["Problem deleting token"]});
        }
    }

    public static async checkAuth(req: Request, res: Response) {
        res.send(res.locals.user);
    }
}