import Joi from "joi";

export const verifyEmailSchema = Joi.object
({
    uuid: Joi.string().uuid().required(),
});

