import {Router} from "express";
import {ProfileController} from "../controllers/ProfileController.ts";
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {uploadImageMiddleware} from "../middlewares/uploadImageMiddleware.ts";

export const profileRouter = Router();

profileRouter.get(
    "/profile/:username",
    ProfileController.getProfile
);

profileRouter.post(
    "/profile/upload-avatar",
    authMiddleware(),
    uploadImageMiddleware.single('image'),
    ProfileController.uploadProfileAvatar
);
