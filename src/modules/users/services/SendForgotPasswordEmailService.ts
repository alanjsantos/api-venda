import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UserTokens from "../typeorm/entities/UserToken";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";
import EtherealMail from '@config/mails/EtherealMail'
import path from 'path';

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

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');
        

        await EtherealMail.sendEmail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperação de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`
                } 
            }
            
        })
    }   
}