import Joi from "joi";

export const signUpSchema = Joi.object
({
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required()
});

