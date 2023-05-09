import {
    DataTypes,
    HasManyGetAssociationsMixin,
    Model,
    Optional,
    NonAttribute,
    Association,
    HasManyAddAssociationMixin
} from "sequelize";
import {sequelize} from "../sequelize.ts";
import {Session} from "./Session.ts";
import {Role} from "./Role.js";
import {AccountRoles} from "./AccountRoles.js";

interface AccountAttributes {
    id: number,
    username: string,
    email: string,
    passwordHash: string
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {
}

export class Account extends Model<AccountAttributes, AccountCreationAttributes> {
    declare getSessions: HasManyGetAssociationsMixin<Session>;
    declare getRoles: HasManyGetAssociationsMixin<Role>;

    declare sessions?: NonAttribute<Session[]>;
    declare roles?: NonAttribute<Role[]>;

    declare static associations: {
        sessions: Association<Account, Session>;
        roles: Association<Account, Role>;
    };
}

Account.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "password_hash"
    },
}, {
    sequelize,
    tableName: "accounts",
    updatedAt: false
})