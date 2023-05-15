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
import {Repository} from "./Repository.js";

interface AccountAttributes {
    id: number,
    username: string,
    email: string,
    passwordHash: string,
    profession?: string | null
    avatar?: string | null
    summary?: string | null
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {
}

export class Account extends Model<AccountAttributes, AccountCreationAttributes> {
    declare getSessions: HasManyGetAssociationsMixin<Session>;
    declare getRoles: HasManyGetAssociationsMixin<Role>;
    declare getRepositories: HasManyGetAssociationsMixin<Repository>;

    declare sessions?: NonAttribute<Session[]>;
    declare roles?: NonAttribute<Role[]>;
    declare repositories?: NonAttribute<Repository[]>;

    declare static associations: {
        sessions: Association<Account, Session>;
        roles: Association<Account, Role>;
        repositories: Association<Account, Repository>;
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

    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profession: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "accounts",
    updatedAt: false
})