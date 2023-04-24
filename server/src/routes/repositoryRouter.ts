import {authMiddleware} from "../middlewares/authMiddleware.js";
import {validationMiddleware} from "../middlewares/validationMiddleware.js";
import {createRepoSchema} from "../utils/validations/Repositories/createRepoSchema.js";
import {RepositoryController} from "../controllers/RepositoryController.js";
import {Router} from "express";
import {deleteRepoSchema} from "../utils/validations/Repositories/deleteRepoSchema.js";

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
    validationMiddleware(deleteRepoSchema, 'params'),
    RepositoryController.deleteRepo
);
