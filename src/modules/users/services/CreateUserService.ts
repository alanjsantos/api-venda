import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/repositories/UsersRepository";

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

        //criptografando password do usuario
        const hashedPassword = await hash(password, 8);

        //criando objeto a ser salvo
        const user = userRepo.create({
            name,
            email,
            password: hashedPassword,
        })

        //salvando o objeto
        await userRepo.save(user);

        //retornando objeto salvo
        return user;
    
    }
}