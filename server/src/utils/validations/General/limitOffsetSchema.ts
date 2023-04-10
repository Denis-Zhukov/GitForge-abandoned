import Joi from "joi";

export const limitOffsetSchema = Joi.object({
    limit: Joi.number().integer().positive().min(1),
    offset: Joi.number().integer().positive().min(0)
});