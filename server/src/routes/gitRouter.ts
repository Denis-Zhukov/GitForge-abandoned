import {Router} from "express";
import * as dotenv from 'dotenv';
import {setOriginalUrlMiddleware} from "../middlewares/setOriginalUrlMiddleware.js";
import {GitController} from "../controllers/GitController.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import {validationMiddleware} from "../middlewares/validationMiddleware.js";
import {createRepoSchema} from "../utils/validations/Repositories/createRepoSchema.js";

dotenv.config();


export const gitRouter = Router();

gitRouter.use(setOriginalUrlMiddleware);

gitRouter.get("/:account/:repo/info/refs", GitController.infoRefs)

gitRouter.post(["/:account/:repo/git-receive-pack", "/:account/:repo/git-upload-pack"],
    GitController.handle
)