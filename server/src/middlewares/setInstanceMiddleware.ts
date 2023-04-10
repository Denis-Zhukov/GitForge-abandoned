import {NextFunction, Request, Response} from "express";
import {ParamsId} from "../controllers/types/ParamsId.js";

//failed to type
export const setInstanceMiddleware = (model: any) => {
    return async (req: Request<ParamsId>, res: Response, next: NextFunction) => {
        const id = Number(req.params.id);
        try {
            const instance = await model.findByPk(id);
            if (!instance) return res.status(404).send({
                error: `Record not found`,
                details: [`Record with id ${id} not found`]
            });

            res.locals.instance = instance;
            next();
        } catch (e) {
            res.sendStatus(500);
        }
    }
}