import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User
    token: string;
}

export default class CreaSessionService {

    //metodo para criar um token
    public async userAuthentication({email, password}: IRequest): Promise<IResponse> {
        const userRepo = getCustomRepository(UserRepository);
        const user = await userRepo.findByEmail(email);

        //testando se existe usuario com este email no banco de dados.
        if (!user) {
            throw new AppError('Incorret email/password combination.', 401);
        }

        //comprando a senha criptografada com a senha do usuario
        const passwordConfirmed = await compare(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorret email/password combination', 401);   
        }   

        const token = sign({}, '639698693822182ed3a9dc179c0c9618', {
            subject: user.id,
            expiresIn: '1d'
        })

        //retornando objeto salvo
        return {
            user,
            token
        };
    
    }
}