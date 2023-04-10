import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../sequelize.ts";

interface ConfirmationAttributes {
    uuid: string,
    userId: number
}

export class Confirmation extends Model<ConfirmationAttributes> {
}

Confirmation.init({
    uuid: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
        unique: true,
        primaryKey: true
    }
}, {
    sequelize,
    tableName: "confirmations",
    timestamps: false
})