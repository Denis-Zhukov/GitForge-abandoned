import Joi from "joi";

export const idSchema = Joi.object({
    id: Joi.number().integer().positive().min(1).required(),
});