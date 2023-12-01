import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){

    // Receber o token
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token ] = authToken.split(" ")

    console.log(token);
}