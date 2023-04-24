import {Request, Response} from "express";
import {CreateRepositoryDTO} from "../utils/dto/Repository/CreateRepositoryDTO.js";
import {UserJwtPayload} from "../utils/types/UserJwtPayload.js";
import path from "path";
import {Repository} from "../database/models/Repository.js";
import git from "isomorphic-git";
import fs from "fs";
import fsp from "fs/promises";
import {ParamsRepoName} from "./types/ParamsRepoName.js";

const __dirname = path.resolve();

export class RepositoryController {
    static async createRepo(req: Request<{}, {}, CreateRepositoryDTO, {}>, res: Response) {
        const user: UserJwtPayload = res.locals.user;
        const repoName = req.body.name;
        const dir = path.join(__dirname, "repos", user.username, repoName);
        try {
            const [repo, built] = await Repository.findOrBuild({
                where: {
                    ownerId: user.id,
                    name: repoName,
                }
            });

            if (!built)
                return res.status(400).send({
                    error: "Repository already exists",
                    details: [`${user.username} already has repository with name '${repoName}'`]
                })

            await git.init({
                fs, dir, bare: true, defaultBranch: "main"
            });
            await repo.save();

            res.sendStatus(200);
        } catch (e) {
            res.send(e);
        }
    }

    static async deleteRepo(req: Request<ParamsRepoName, {}, {}, {}>, res: Response) {
        const user: UserJwtPayload = res.locals.user;
        const repoName = req.params.repo;
        const dir = path.join(__dirname, "repos", user.username, repoName);

        try {
            const repo = await Repository.findOne({
                where: {
                    ownerId: user.id,
                    name: repoName
                }
            })
            console.log(await Repository.findAll())
            if (!repo)
                return res.status(400).send({
                    error: "No such repository",
                    details: [`${user.username} hasn't repository '${repoName}'`]
                })

            await repo.destroy();
            await fsp.rm(dir, {recursive: true, force: true})

            res.sendStatus(200);
        } catch (e) {
            res.send(e);
        }
    }
}