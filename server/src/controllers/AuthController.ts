import {Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import {Account} from "../database/models/Account.js";
import {Session} from "../database/models/Session.js";
import {UserJwtPayload} from "../utils/types/UserJwtPayload.js";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const LIFE_ACCESS_TOKEN = process.env.LIFE_ACCESS_TOKEN || '5 min';
const LIFE_REFRESH_TOKEN = process.env.LIFE_REFRESH_TOKEN || '30 days';

export class AuthController {
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
            const user = userModel.get();

            const correspond = await bcrypt.compare(password, user.passwordHash);
            if (!correspond) return res.status(401).send({
                error: "Wrong password", details: [`Wrong password`]
            });

            const refreshToken = jwt.sign({
                id: user.id, username: user.username
            }, REFRESH_SECRET, {expiresIn: LIFE_REFRESH_TOKEN});
            const accessToken = jwt.sign({
                id: user.id, username: user.username
            }, ACCESS_SECRET, {expiresIn: LIFE_ACCESS_TOKEN});
            const [session, founded] = await Session.findOrBuild({
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
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10
            }).send({access_token: accessToken});
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

    static async logout(req: Request, res: Response) {
        const refreshToken = req.cookies.refresh_token;
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
}