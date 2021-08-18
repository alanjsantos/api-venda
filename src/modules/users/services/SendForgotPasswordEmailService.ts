import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserTokens from "../typeorm/entities/UserToken";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UserRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";

interface IRequest {
    email: string;

}

export default class SendForgotPasswordEmailService {

    //metodo para criar um email
    public async sendEmailUser({email}: IRequest): Promise<void> {

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UsersTokensRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists.');
        }
        
        const token = await userTokensRepository.generate(user.id);

    }
}