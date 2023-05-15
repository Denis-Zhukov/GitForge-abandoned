import {authMiddleware} from "../middlewares/authMiddleware.js";
import {validationMiddleware} from "../middlewares/validationMiddleware.js";
import {createRepoSchema} from "../utils/validations/Repositories/createRepoSchema.js";
import {RepositoryController} from "../controllers/RepositoryController.js";
import {Router} from "express";
import {deleteRepoSchema} from "../utils/validations/Repositories/deleteRepoSchema.js";
import {getReposSchema} from "../utils/validations/Repositories/getReposSchema.js";
import {setDescriptionRepoSchema} from "../utils/validations/Repositories/setDescriptionRepoSchema.js";

export const repositoryRouter = Router();


repositoryRouter.get(
    "/:username/repos",
    RepositoryController.getRepos
);

repositoryRouter.get(
    "/:username/repos/favorites",
    RepositoryController.getFavorites
);

repositoryRouter.get(
    "/:username/:repo",
    RepositoryController.getRepo
);

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

repositoryRouter.post(
    "/update-repo/:repo",
    authMiddleware(),
    validationMiddleware(setDescriptionRepoSchema, 'body'),
    RepositoryController.setDescriptionRepo
);

repositoryRouter.post(
    "/toggle-favorite/:repo",
    authMiddleware(),
    RepositoryController.toggleFavoriteRepository
);