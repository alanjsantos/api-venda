import auth from "@config/auth";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(resquest: Request, response: Response, next: NextFunction): void {
 const authHeader = resquest.headers.authorization;

 if (!authHeader) {
     throw new AppError('JWT Token is missing');
     
 } else {
     const [, token] = authHeader.split(' ');

     try {
         const decodedToken = verify(token, auth.jwt.secret)
         
         const {sub} = decodedToken as TokenPayload;
         
         resquest.user = {
             id: sub
         }

         return next();
         
     } catch {
         throw new AppError('Invalid JWT token');
         
     }
 }
}