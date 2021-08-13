import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UserRepository";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateUserService {

    //metodo para criar um produto
    public async createUser({name, email, password}: IRequest): Promise<User> {
        const userRepo = getCustomRepository(UserRepository);
        const userEmailExist = await userRepo.findByEmail(email);

        //testando se existe usuario com este email no banco de dados.
        if (userEmailExist) {
            throw new AppError('There is a user with this email');
        }

        //criando objeto a ser salvo
        const user = userRepo.create({
            name,
            email,
            password
        })

        //salvando o objeto
        await userRepo.save(user);

        //retornando objeto salvo
        return user;
    
    }
}