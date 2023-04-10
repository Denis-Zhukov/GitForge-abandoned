import {Router} from "express";
import {AuthController} from "../controllers/AuthController.js";
import {validationMiddleware} from "../middlewares/validationMiddleware.js";
import {authSchema} from "../utils/validations/Auth/authSchema.js";

export const authRouter = Router();

authRouter.post(
    "/sign-in",
    validationMiddleware(authSchema, 'body'),
    AuthController.signIn
);