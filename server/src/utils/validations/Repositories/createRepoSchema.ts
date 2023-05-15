import Joi from "joi";

export const createRepoSchema = Joi.object
({
    name: Joi.string().pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).required().messages({
        "string.pattern.base": `Repository name must be in slug format. Examples: 'myrepo', 'my-repo'`,
    })
});

