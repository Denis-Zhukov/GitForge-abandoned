import {Router} from "express";
import {ProfileController} from "../controllers/ProfileController.ts";
import {authMiddleware} from "../middlewares/authMiddleware.ts";
import {uploadImageMiddleware} from "../middlewares/uploadImageMiddleware.ts";
import {validationMiddleware} from "../middlewares/validationMiddleware.js";
import {professionSchema} from "../utils/validations/Profile/professionSchema.js";
import {summarySchema} from "../utils/validations/Profile/summarySchema.js";

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

profileRouter.post(
    "/profile/delete-avatar",
    authMiddleware(),
    ProfileController.deleteProfileAvatar
);

profileRouter.post(
    "/profile/set-profession",
    validationMiddleware(professionSchema, "body"),
    authMiddleware(),
    ProfileController.setProfileProfession
);

profileRouter.post(
    "/profile/set-summary",
    validationMiddleware(summarySchema, "body"),
    authMiddleware(),
    ProfileController.setProfileSummary
);