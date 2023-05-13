import express, {Router} from "express";
import morgan from "morgan";
import {gitRouter} from "./gitRouter.js";
import {accountRouter} from "./accountRouter.ts";
import {profileRouter} from "./profileRouter.ts";
import {authRouter} from "./authRouter.js";
import {repositoryRouter} from "./repositoryRouter.js";
import * as useragent from "express-useragent";

export const rootRouter = Router();

rootRouter.use(express.urlencoded({extended: true}));
rootRouter.use(morgan("tiny"));

rootRouter.use(authRouter);
rootRouter.use(accountRouter);
rootRouter.use(profileRouter);
rootRouter.use(repositoryRouter);
rootRouter.use(gitRouter);

rootRouter.get("/test", useragent.express(), (req, res) => {
    res.sendStatus(200);
})
