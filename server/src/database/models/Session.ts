import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../sequelize.ts";

interface RoleAttributes {
    id: number,
    accountId: number,
    device: string,
    refreshToken: string
    lastAccess: Date
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {
}

export class Session extends Model<RoleAttributes, RoleCreationAttributes> {
    updatedAt?: Date;
}

Session.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "account_id"
    },
    device: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "refresh_token"
    },
    lastAccess: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "last_access"
    },
}, {
    sequelize,
    tableName: "sessions",
    createdAt: false
})