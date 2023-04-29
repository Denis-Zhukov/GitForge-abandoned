import {Router} from "express";
import {AuthController} from "../controllers/AuthController.ts";
import {validationMiddleware} from "../middlewares/validationMiddleware.ts";
import {signInSchema} from "../utils/validations/Auth/signInSchema.ts";
import {signUpSchema} from "../utils/validations/Auth/signUpSchema.ts";
import {verifyEmailSchema} from "../utils/validations/Auth/verifyEmailSchema.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

export const authRouter = Router();

authRouter.get(
    "/my-roles",
    authMiddleware(),
    AuthController.getRoles
)

authRouter.post(
    "/sign-in",
    validationMiddleware(signInSchema, 'body'),
    AuthController.signIn
);

authRouter.post(
    "/sign-up",
    validationMiddleware(signUpSchema, 'body'),
    AuthController.signUp
);

authRouter.get(
    "/registration-requests/verify-email/:uuid",
    validationMiddleware(verifyEmailSchema, 'params'),
    AuthController.verifyEmail
)