import Joi from "joi";
import {AddAccountDTO} from "../../dto/Account/AddAccountDTO.js";

export const addAccountSchema = Joi.object<AddAccountDTO>
({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required()
});

