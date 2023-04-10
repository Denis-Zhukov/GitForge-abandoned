import express, {Router} from "express";
import {gitRouter} from "./gitRouter.js";
import morgan from "morgan";
import {accountRouter} from "./accountRouter.ts";
import {authRouter} from "./authRouter.js";
import * as useragent from "express-useragent";

export const rootRouter = Router();

rootRouter.use(express.json());
rootRouter.use(express.urlencoded({extended: true}));
rootRouter.use(morgan("tiny"));

rootRouter.use(gitRouter);

rootRouter.use(accountRouter);
rootRouter.use(authRouter);

rootRouter.get("/test", useragent.express(), (req, res) => {
    
    res.sendStatus(200);
})
