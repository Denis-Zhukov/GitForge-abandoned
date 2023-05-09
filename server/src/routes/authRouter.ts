import {Router} from "express";
import {AuthController} from "../controllers/AuthController.ts";
import {validationMiddleware} from "../middlewares/validationMiddleware.ts";
import {signInSchema} from "../utils/validations/Auth/signInSchema.ts";
import {signUpSchema} from "../utils/validations/Auth/signUpSchema.ts";
import {verifyEmailSchema} from "../utils/validations/Auth/verifyEmailSchema.js";
import {authMiddleware} from "../middlewares/authMiddleware.js";

export const authRouter = Router();

authRouter.post(
    "/sign-up",
    validationMiddleware(signUpSchema, 'body'),
    AuthController.signUp
);

authRouter.post(
    "/sign-in",
    validationMiddleware(signInSchema, 'body'),
    AuthController.signIn
);

authRouter.post(
    "/check-auth",
    authMiddleware(),
    AuthController.checkAuth
)

authRouter.post(
    "/refresh",
    AuthController.refreshAccessToken
)

authRouter.post(
    "/log-out",
    AuthController.logout
);

authRouter.get(
    "/registration-requests/verify-email/:uuid",
    validationMiddleware(verifyEmailSchema, 'params'),
    AuthController.verifyEmail
)