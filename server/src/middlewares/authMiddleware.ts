import jwt from "jsonwebtoken";
import {NextFunction, Request, Response} from "express";
import * as dotenv from 'dotenv';
import {UserJwtPayload} from "../utils/types/UserJwtPayload.js";

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET!;

export const authMiddleware = (roles: string[] = []) => (req: Request<any>, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')?.[1]!;
        const user = <UserJwtPayload>jwt.verify(token, ACCESS_SECRET);
        if (roles.length !== 0 && !roles.includes(user.role))
            return res.sendStatus(403);

        res.locals.user = user;
        next();
    } catch (e) {
        res.sendStatus(401);
    }
}