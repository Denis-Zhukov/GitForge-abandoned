import Joi from "joi";

export const authSchema = Joi.object
({
    username: Joi.string().required(),
    password: Joi.string().required()
});

