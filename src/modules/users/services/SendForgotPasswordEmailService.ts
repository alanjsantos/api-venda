import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserTokens from "../typeorm/entities/UserTokens";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepotiory from "../typeorm/repositories/UserTokensRepository";

interface IRequest {
    email: string;

}

export default class SendForgotPasswordEmailService {

    //metodo para criar um produto
    public async sendEmailUser({email}: IRequest): Promise<void> {
        const userRepo = getCustomRepository(UserRepository);
        const userTokens = getCustomRepository(UserTokensRepotiory);

        //buscando usuario por meial
        const user = await userRepo.findByEmail(email);

        //verificando se existe token cadastrado no banco de dados.
        if (!user) {
            throw new AppError('User dos not exists');
        }

        //gerando otken
        const userToken =  await userTokens.generateToken(user.id)

        console.log(userToken);
        
    }
}