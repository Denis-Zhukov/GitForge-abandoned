import Joi from "joi";

export const professionSchema = Joi.object({
    profession: Joi.string().min(1).max(255).required()
});