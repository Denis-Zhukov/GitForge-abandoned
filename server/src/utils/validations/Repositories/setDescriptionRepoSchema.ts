import Joi from "joi";

export const setDescriptionRepoSchema = Joi.object
({
    description: Joi.string().max(255).required()
});

