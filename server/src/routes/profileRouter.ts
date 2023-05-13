import {Router} from "express";
import {ProfileController} from "../controllers/ProfileController.js";

export const profileRouter = Router();

profileRouter.get(
    "/profile/:username",
    ProfileController.getProfile
);
