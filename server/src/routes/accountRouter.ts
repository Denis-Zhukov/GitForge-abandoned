import {Router} from "express";
import {AccountController} from "../controllers/AccountController.ts";
import {validationMiddleware} from "../middlewares/validationMiddleware.ts";
import {limitOffsetSchema} from "../utils/validations/General/limitOffsetSchema.ts";
import {idSchema} from "../utils/validations/General/idSchema.ts";
import {addAccountSchema} from "../utils/validations/Accounts/addAccountSchema.ts";
import {updateAccountSchema} from "../utils/validations/Accounts/updateAccountSchema.ts";
import {setInstanceMiddleware} from "../middlewares/setInstanceMiddleware.js";
import {Account} from "../database/models/Account.ts";

export const accountRouter = Router();

accountRouter.post(
    "/accounts",
    validationMiddleware(addAccountSchema, 'body'),
    AccountController.addAccount
);

accountRouter.get(
    "/accounts",
    validationMiddleware(limitOffsetSchema, 'query'),
    AccountController.getAccounts
);

accountRouter.get(
    "/accounts/:id",
    validationMiddleware(idSchema, 'params'),
    AccountController.getAccountById
);

accountRouter.put(
    "/accounts/:id",
    validationMiddleware(idSchema, 'params'),
    validationMiddleware(updateAccountSchema, 'body'),
    setInstanceMiddleware(Account),
    AccountController.updateAccount
);

accountRouter.delete(
    "/accounts/:id",
    validationMiddleware(idSchema, 'params'),
    setInstanceMiddleware(Account),
    AccountController.deleteAccount
);
