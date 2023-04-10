import jwt from "jsonwebtoken";

export interface UserJwtPayload extends jwt.JwtPayload {
    id: number,
    username: string,
    role: string
}