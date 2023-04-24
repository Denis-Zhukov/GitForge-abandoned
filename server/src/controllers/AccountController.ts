import {Request, Response} from "express";
import bcrypt from "bcrypt";
import {Account} from "../database/models/Account.ts";
import {QueryLimitOffset} from "./types/QueryLimitOffset.js";
import {AddAccountDTO} from "../utils/dto/Account/AddAccountDTO.js";
import {UpdateAccountDTO} from "../utils/dto/Account/UpdateAccountDTO.js";
import {ParamsId} from "./types/ParamsId.js";


export class AccountController {
    public static async getAccounts(req: Request<{}, {}, {}, QueryLimitOffset>, res: Response) {
        let limit: number | undefined = Number(req.query.limit);
        let offset: number | undefined = Number(req.query.offset);

        limit = Number.isSafeInteger(limit) ? limit : undefined;
        offset = Number.isSafeInteger(offset) ? offset : undefined;

        try {
            const accounts = await Account.findAll({limit, offset});
            res.send(accounts);
        } catch (e: any) {
            res.json(e.message)
        }
    }

    public static async getAccountById(req: Request<ParamsId, {}, {}, {}>, res: Response) {
        const id = Number(req.params.id);

        try {
            const account = await Account.findByPk(id);
            if (!account) return res.status(404).send({
                error: `User not found`,
                details: [`User with id ${id} not found`]
            });
            res.send(account);
        } catch (e: any) {
            res.json(e.message)
        }
    }

    public static async addAccount(req: Request<{}, {}, AddAccountDTO, {}>, res: Response) {
        const saltRounds = 10;
        const password = req.body.password;

        try {
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const account = await Account.create({
                email: req.body.email,
                username: req.body.username.toLowerCase(),
                passwordHash
            });

            res.status(201).send(account);
        } catch (e: any) {
            res.status(400).send({error: e.original?.detail, details: [e.original?.detail]});
        }
    }

    public static async updateAccount(req: Request<ParamsId, {}, UpdateAccountDTO, {}, Account>, res: Response) {
        const saltRounds = 10;
        const account = res.locals.instance as Account;
        const accountFields = account.get();

        try {
            const {email, username, password} = req.body;

            account.set({
                email: email || accountFields.email,
                username: username || accountFields.username,
                passwordHash: password ? (await bcrypt.hash(password, saltRounds)) : accountFields.passwordHash
            });

            const updatedAccount = await account.save();
            res.send(updatedAccount);
        } catch (e: any) {
            res.status(400).send({error: e.original?.detail, details: [e.original?.detail]});
        }
    }

    public static async deleteAccount(req: Request<ParamsId, {}, UpdateAccountDTO>, res: Response) {
        const account = res.locals.instance as Account;
        try {
            await account.destroy();
            res.send(account);
        } catch (e: any) {
            res.status(400).send({error: e.original?.detail, details: [e.original?.detail]});
        }
    }
}