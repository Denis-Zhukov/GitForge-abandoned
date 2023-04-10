import {DataTypes, HasManyGetAssociationsMixin, Model, Optional} from "sequelize";
import {sequelize} from "../sequelize.ts";
import {Session} from "./Session.js";

interface AccountAttributes {
    id: number,
    username: string,
    email: string,
    passwordHash: string,
    // followers: number
}

interface AccountCreationAttributes extends Optional<AccountAttributes, 'id'> {
}

export class Account extends Model<AccountAttributes, AccountCreationAttributes> {
    createdAt?: Date;

    public getSessions!: HasManyGetAssociationsMixin<Session>;
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
    // followers: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     defaultValue: 0
    // },
}, {
    sequelize,
    tableName: "accounts",
    updatedAt: false
})