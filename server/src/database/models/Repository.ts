import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../sequelize.js";

interface RepositoryAttributes {
    id: number,
    ownerId: number,
    name: string,
    likes: number,
    private: boolean,
}

interface RepositoryCreationAttributes extends Optional<RepositoryAttributes, 'id' | 'likes' | 'private'> {
}

export class Repository extends Model<RepositoryAttributes, RepositoryCreationAttributes> {
    createdAt?: Date;
}

Repository.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "owner_id"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }

}, {
    sequelize,
    tableName: "repositories",
    updatedAt: false,
    indexes: [
        {fields: ['owner_id', 'name'], unique: true}
    ]
})