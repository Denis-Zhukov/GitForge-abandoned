import {Request, Response} from "express";
import fsp from "fs/promises";
import path from "path";
import auth from "basic-auth";
import process from "process";
import {pathExists as exists} from "../utils/path-exists.js";
import {Git} from "node-git-server";
import {Account} from "../database/models/Account.js";
import bcrypt from "bcrypt";
import {Confirmation} from "../database/models/Confirmation.js";

const repoDir = path.join(process.cwd(), "repos");
const repos = new Git(repoDir, {autoCreate: false});
const handle = repos.handle.bind(repos);

export class GitController {
    static async infoRefs(req: Request, res: Response) {
        const {service} = req.query;
        const {account, repo} = req.params;

        if (service === "git-upload-pack") return handle(req, res);

        try {
            const {name, pass} = auth(req)!;

            const userModel = await Account.findOne({where: {username: name}});
            if (!userModel) return sendError(res, "Wrong username")

            const user = userModel.get();

            if (user.username !== account) return sendError(res, "It's not your repository");

            const correspond = await bcrypt.compare(pass, user.passwordHash);
            if (!correspond) return sendError(res, "Wrong password");

            const confirmation = await Confirmation.findOne({where: {userId: user.id}});
            if (confirmation)
                return sendError(res, "You have to confirm your email in the first way");

        } catch (e) {
            return sendError(res, "Bad request");
        }

        handle(req, res);

        const emptyFolder = path.join(process.cwd(), account);
        if (service === "git-receive-pack" && await exists(emptyFolder))
            await fsp.rm(emptyFolder, {recursive: true, force: true});
    }

    static async handle(req: Request, res: Response) {
        handle(req, res)
    }
}

const sendError = (res: Response, text: string) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('WWW-Authenticate', 'Basic realm="authorization needed"');
    res.writeHead(401);
    res.end(text);
}