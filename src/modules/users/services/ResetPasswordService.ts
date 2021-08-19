import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";

interface IRequest {
    token: string;
    password: string;

}

export default class ResetPasswordService {

    //metodo para criar um produto
    public async resetPassword({token, password}: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UsersTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
         throw new AppError('User Token does not exists.');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
         throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
         throw new AppError('Token expired.');
        }

        user.password = await hash(password, 8)
        
        await usersRepository.save(user);
        }
}