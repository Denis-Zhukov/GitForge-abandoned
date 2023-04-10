import {NextFunction, Request, Response} from "express";

export const setOriginalUrlMiddleware = (req: Request, res: Response, next: NextFunction) => {
    req.url = req.originalUrl;
    next();
}