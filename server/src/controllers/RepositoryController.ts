import {Request, Response} from "express";
import {CreateRepositoryDTO} from "../utils/dto/Repository/CreateRepositoryDTO.js";
import {UserJwtPayload} from "../utils/types/UserJwtPayload.js";
import path from "path";
import {Repository} from "../database/models/Repository.js";
import git from "isomorphic-git";
import fs from "fs";
import fsp from "fs/promises";
import {ParamsRepoName} from "./types/ParamsRepoName.js";
import {ParamsUsername} from "./types/ParamsUsername.js";
import {Account} from "../database/models/Account.js";
import process from "process";

const __dirname = path.resolve();

export class RepositoryController {
    static async createRepo(req: Request<{}, {}, CreateRepositoryDTO, {}>, res: Response) {
        const user: UserJwtPayload = res.locals.user;
        const repoName = req.body.name;
        const gitdir = path.join(__dirname, "repos", user.username, repoName);
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
                    details: [`${user.username} already has repository '${repoName}'`]
                })

            await git.init({
                fs, gitdir, bare: true, defaultBranch: "main"
            });
            const headRefPath = `${gitdir}/refs/heads/HEAD`;
            await fs.promises.writeFile(headRefPath, 'ref: refs/heads/master\n');


            await repo.save();

            res.status(201).json({success: true});
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

    static async getRepos(req: Request<ParamsUsername>, res: Response) {
        const {username} = req.params;

        const accountModel = await Account.findOne({where: {username}});
        if (!accountModel) return res.status(404).send({
            error: "User not found",
            details: [`User '${username}' not found`]
        })

        const repos = await accountModel.getRepositories();
        res.json(repos?.map(repo => repo.get()) || []);
    }

    static async getRepo(req: Request<ParamsRepoName & ParamsUsername>, res: Response) {
        const {username, repo} = req.params;

        const accountModel = await Account.findOne({where: {username}});
        if (!accountModel) return res.status(404).send({
            error: "User not found",
            details: [`User '${username}' not found`]
        })

        const repoModel = await Repository.findOne({where: {name: repo, ownerId: accountModel.get().id}});
        if (!repoModel) return res.status(404).send({
            error: "Repository not found",
            details: [`Repository '${repo}' not found`]
        })


        try {
            const gitdir = path.join(process.cwd(), "repos", username, repo);

            const files = await git.listFiles({
                fs, gitdir, ref: "master"
            });

            const branches = await git.listBranches({fs, gitdir});

            res.send({...repoModel.get(), files, branches});
        } catch (e) {
            res.status(200).json({text: "Repository is empty", ...repoModel.get()});
        }
    }

    static async setDescriptionRepo(req: Request<ParamsRepoName>, res: Response) {
        const {repo} = req.params;
        const user = res.locals.user as UserJwtPayload;
        const description: string = req.body.description;

        const accountModel = await Account.findByPk(user.id);

        if (!accountModel) return res.status(401).send({error: "bad auth", details: ["bad auth"]})

        const repoModel = await Repository.findOne({where: {name: repo, ownerId: accountModel.get().id}});
        if (!repoModel) return res.status(404).send({
            error: "Repository not found",
            details: [`Repository '${repo}' not found`]
        })

        repoModel.set({description});

        await repoModel.save();

        res.json({success: true});
    }

    static async toggleFavoriteRepository(req: Request<ParamsRepoName>, res: Response) {
        const {repo} = req.params;
        const user = res.locals.user as UserJwtPayload;
        const description: string = req.body.description;

        const accountModel = await Account.findByPk(user.id);

        if (!accountModel) return res.status(401).send({error: "bad auth", details: ["bad auth"]})

        const repoModel = await Repository.findOne({where: {name: repo, ownerId: accountModel.get().id}});
        if (!repoModel) return res.status(404).send({
            error: "Repository not found",
            details: [`Repository '${repo}' not found`]
        })

        repoModel.set({favorite: !repoModel.get().favorite});
        await repoModel.save();

        res.json({success: true});
    }

    static async getFavorites(req: Request<ParamsUsername>, res: Response) {
        const {username} = req.params;
        console.log('here')
        const accountModel = await Account.findOne({where: {username}});
        if (!accountModel) return res.status(404).send({
            error: "User not found",
            details: [`User '${username}' not found`]
        })

        const repositories = await Repository.findAll({where: {ownerId: accountModel.get().id, favorite: true}});
        res.send(repositories || [])
    }
}