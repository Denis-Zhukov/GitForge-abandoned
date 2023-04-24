import Joi from "joi";

export const createRepoSchema = Joi.object
({
    name: Joi.string().required()
});

