import {Request, Response} from "express";
import {ParamsUsername} from "./types/ParamsUsername.js";
import {Account} from "../database/models/Account.js";
import {UserJwtPayload} from "../utils/types/UserJwtPayload.js";
import path from "path";
import fs from "fs/promises";

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

    public static async uploadProfileAvatar(req: Request, res: Response) {
        if (!req.file)
            return res.status(400).json({error: "No image file provided", details: ["No image file provided"]});

        console.log(req.file)
        const user: UserJwtPayload = res.locals.user;

        const avatarPath = `http://127.0.0.1:8000/avatars/${req.file.filename}`;
        const userModel = await Account.findByPk(user.id);

        const userInstance = userModel?.get();

        if (userInstance && userInstance.avatar) {
            try {
                const oldAvatar = path.join(path.resolve(), "public", "avatars", userInstance.avatar.split("/").at(-1)!);
                await fs.unlink(oldAvatar)
            } catch {
            }
        }
        userModel!.set({avatar: avatarPath});
        userModel?.save();

        res.status(200).json({success: true});
    }
}