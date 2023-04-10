import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../sequelize.ts";

interface RoleAttributes {
    id: number,
    name: string
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> {
}

export class Role extends Model<RoleAttributes, RoleCreationAttributes> {
}

Role.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "roles",
    timestamps: false
})