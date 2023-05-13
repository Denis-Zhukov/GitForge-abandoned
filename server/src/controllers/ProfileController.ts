import {Request, Response} from "express";
import {ParamsUsername} from "./types/ParamsUsername.js";
import {Account} from "../database/models/Account.js";

export class ProfileController {
    public static async getProfile(req: Request<ParamsUsername>, res: Response) {
        const {username} = req.params;

        try {
            const accountModel = await Account.findOne({where: {username}});
            if (!accountModel) return res.sendStatus(404);

            res.send(accountModel);
        } catch (e: any) {
            res.json(e.message)
        }
    }


}