import {Request, Response} from "express";
import fsp from "fs/promises";
import path from "path";
import auth from "basic-auth";
import process from "process";
import {pathExists as exists} from "../utils/path-exists.js";
import {Git} from "node-git-server";
const repoDir = path.join(process.cwd(), "repos");
const repos = new Git(repoDir, {autoCreate: false});
const handle = repos.handle.bind(repos);

export class GitController {
    static async infoRefs(req: Request, res: Response) {
        const {service} = req.query;
        const {account, repo} = req.params;

        try {
            const {name, pass} = auth(req)!;
        } catch (e) {
            res.setHeader('Content-Type', 'text/plain');
            res.setHeader('WWW-Authenticate', 'Basic realm="authorization needed"');
            res.writeHead(401);
            return res.end("Bad request");
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