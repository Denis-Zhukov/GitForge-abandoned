import {Git} from "node-git-server";
import path from "path";
import {Request, Response, Router} from "express";
import * as dotenv from 'dotenv';
import * as process from "process";
import fs from "fs/promises";
import {pathExists as exists} from "../utils/path-exists.ts";
import {setOriginalUrlMiddleware} from "../middlewares/setOriginalUrlMiddleware.js";
import auth from "basic-auth";

dotenv.config();

const repoDir = path.join(process.cwd(), "repos");

const repos = new Git(repoDir, {autoCreate: false});

const handle = repos.handle.bind(repos);

export const gitRouter = Router();

gitRouter.use(setOriginalUrlMiddleware);


gitRouter.get("/:account/:repo/info/refs", async (req: Request, res: Response) => {
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
            await fs.rm(emptyFolder, {recursive: true, force: true});
    }
)

gitRouter.post(
    ["/:account/:repo/git-receive-pack", "/:account/:repo/git-upload-pack"],
    (req: Request, res: Response) => handle(req, res)
)