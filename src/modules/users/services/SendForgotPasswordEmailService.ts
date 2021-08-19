import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserTokens from "../typeorm/entities/UserToken";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from '@config/mails/EtherealMail'

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
        
        const {token} = await userTokensRepository.generate(user.id);

        console.log(token);
        

        await EtherealMail.sendEmail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                template: `Olá {{name}}: {{token}}`,
                variables: {
                    name: user.name,
                    token
                } 
            }
            
        })
    }   
}