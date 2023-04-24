import {authMiddleware} from "../middlewares/authMiddleware.js";
import {validationMiddleware} from "../middlewares/validationMiddleware.js";
import {createRepoSchema} from "../utils/validations/Repositories/createRepoSchema.js";
import {RepositoryController} from "../controllers/RepositoryController.js";
import {Router} from "express";

export const repositoryRouter = Router();

repositoryRouter.post(
    "/create-repo",
    authMiddleware(),
    validationMiddleware(createRepoSchema, 'body'),
    RepositoryController.createRepo
);

repositoryRouter.delete(
    "/delete-repo/:repo",
    authMiddleware(),
    RepositoryController.deleteRepo
);
