import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize.ts";

interface AccountRolesAttributes {
    accountId: number,
    roleId: number,
}

export class AccountRoles extends Model<AccountRolesAttributes, AccountRolesAttributes> {
}

AccountRoles.init({
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "account_id",
            primaryKey: true
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "role_id",
            primaryKey: true
        }
    },
    {
        sequelize,
        tableName: "account_roles",
        timestamps: false
    }
)