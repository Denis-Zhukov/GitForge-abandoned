import {Sequelize} from "sequelize";
import * as dotenv from "dotenv";
import * as process from "process";
import {Dialect} from "sequelize/types/sequelize";

dotenv.config();

const host = process.env.DB_HOST || '127.0.0.1';
const port = Number(process.env.DB_PORT) || 5432;
const database = process.env.DATABASE!;
const username = process.env.DB_USERNAME!;
const password = process.env.DB_PASSWORD;
const dialect = process.env.DB_DIALECT as Dialect;

export const sequelize = new Sequelize(
    database, username, password,
    {host, port, dialect}
);