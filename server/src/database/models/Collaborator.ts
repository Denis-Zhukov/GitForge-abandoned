import {DataTypes, Model} from "sequelize";
import {sequelize} from "../sequelize.ts";

interface CollaboratorAttributes {
    repositoryId: number,
    collaboratorId: number,
}


export class Collaborator extends Model<CollaboratorAttributes, CollaboratorAttributes> {
}

Collaborator.init({
        repositoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "repository_id"
        },
        collaboratorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "collaborator_id"
        }
    },
    {
        sequelize,
        timestamps: false,
        tableName: "collaborators"
    }
)