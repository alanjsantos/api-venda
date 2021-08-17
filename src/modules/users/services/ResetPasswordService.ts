import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepotiory from "../typeorm/repositories/UserTokensRepository";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;

}

export default class ResetPasswordService {

    //metodo para criar um produto
    public async resetPassword({token, password}: IRequest): Promise<void> {
        const userRepo = getCustomRepository(UserRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepotiory);

        //buscando usuario por email
        const userTokens = await userTokensRepository.findByToken(token);

        //verificando se existe token cadastrado no banco de dados.
        if (!userTokens) {
            throw new AppError('User Token dos not exists');
        }

        const user = await userRepo.findById(userTokens.id)

        if (!user) {
            throw new AppError('User does not exists');
        }

        const tokenCreatedAt = user.created_at;
        const compareDate = addHours(tokenCreatedAt, 2)
        
        //verificando se o token expirou.
        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }

        user.password = await hash(password, 8);
        
    }
}