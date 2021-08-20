import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    user_id: string;
}

export default class ShowProfileService {

    //metodo para buscar usuario
    public async findByUser({user_id}: IRequest): Promise<User> {

        const userRepo = getCustomRepository(UserRepository);
  
        //buscando todos os usuarios
        const user = await userRepo.findById(user_id)
        
        if (!user) {
            throw new AppError('User not found.');
        }

        //retorna a lista dos usuarios.
        return user;
    }
}

