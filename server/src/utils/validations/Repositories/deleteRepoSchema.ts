import Joi from "joi";

export const deleteRepoSchema = Joi.object
({
    repo: Joi.string().required()
});

