import Joi from "joi";

export const getReposSchema = Joi.object
({
    username: Joi.string().required()
});

