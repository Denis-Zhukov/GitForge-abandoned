import {DataTypes, Model, Optional} from "sequelize";
import {sequelize} from "../sequelize.ts";

interface IssueMessageAttributes {
    id: number,
    issueId: number,
    accountId: number,
    message: number,
}

interface IssueMessageCreationAttributes extends Optional<IssueMessageAttributes, 'id'> {
}

export class IssueMessage extends Model<IssueMessageAttributes, IssueMessageCreationAttributes> {
    createdAt?: Date;
    updatedAt?: Date;
}

IssueMessage.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    issueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "issue_id"
    },
    accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "account_id"
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "issue_messages"
})