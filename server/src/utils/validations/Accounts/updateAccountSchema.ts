import Joi from "joi";
import {UpdateAccountDTO} from "../../dto/Account/UpdateAccountDTO.js";

export const updateAccountSchema = Joi.object<UpdateAccountDTO>
({
    email: Joi.string().email(),
    username: Joi.string(),
    password: Joi.string(),
}).or("email", "username", "password");