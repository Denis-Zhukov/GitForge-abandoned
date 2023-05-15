import Joi from "joi";

export const summarySchema = Joi.object({
    summary: Joi.string().min(1).max(255).required()
});