import {Schema} from "joi";
import {NextFunction, Request, Response} from "express";

type SourceValidation = 'body' | 'params' | 'query';

export const validationMiddleware = (schema: Schema, source: SourceValidation, errorStatus: number = 400) => {
    return (req: Request<{}, {}, any, any>, res: Response, next: NextFunction) => {
        let sourceData;
        switch (source) {
            case "body":
                sourceData = req.body;
                break;
            case "params":
                sourceData = req.params;
                break;
            case "query":
                sourceData = req.query;
                break;
        }

        const {error} = schema.validate(sourceData, {abortEarly: false});
        if (!error) return next();

        res.status(errorStatus).send({
            error: error.message,
            details: error.details.map(detail => detail.message)
        });
    }
}