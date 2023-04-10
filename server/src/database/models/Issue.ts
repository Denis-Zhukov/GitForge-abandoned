import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../sequelize.ts";

interface IssueAttributes {
    id: number,
    repositoryId: number,
    creatorId: number,
    title: string,
}

interface IssueCreationAttributes extends Optional<IssueAttributes, 'id'> {
}

export class Issue extends Model<IssueAttributes, IssueCreationAttributes> {
    createdAt?: Date;
}

Issue.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    repositoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "repository_id"
    },
    creatorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "creator_id"
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "issues",
    updatedAt: false
})