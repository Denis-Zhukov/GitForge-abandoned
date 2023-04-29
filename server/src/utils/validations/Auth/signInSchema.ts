import Joi from "joi";

export const signInSchema = Joi.object
({
    username: Joi.string().required(),
    password: Joi.string().required()
});

