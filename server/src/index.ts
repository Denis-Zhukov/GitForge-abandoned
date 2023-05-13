import express, {NextFunction, Request, Response} from "express";
import 'express-async-errors';
import * as dotenv from 'dotenv';
import {rootRouter} from "./routes/index.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import "./database/init-models.ts";
import {uploadImageMiddleware} from "./middlewares/uploadImageMiddleware.js";

dotenv.config();

const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || "127.0.0.1";

const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static("public"));


app.use(rootRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send({error: 'Your request resulted in an error on the server'});
})

app.listen(PORT, HOST, () => {
    console.log(`Server started at http://${HOST}:${PORT}`)
})