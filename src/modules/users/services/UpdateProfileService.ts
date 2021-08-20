import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UserRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
    user_id: string;
    email: string;
    name: string;
    password: string;
    old_password: string;
}

export default class UpdateProfileService {

    //metodo para buscar usuario
    public async updateProfile({user_id, email, name, password, old_password}: IRequest): Promise<User> {

        const userRepo = getCustomRepository(UserRepository);
  
        //buscando todos os usuarios
        const user = await userRepo.findById(user_id)
        
        //verificando se existe usuario
        if (!user) {
            throw new AppError('User not found.');
        }

        const userUpdateEmail = await userRepo.findByEmail(email)

        //verificando se email é de outro usuario
        if (userUpdateEmail && userUpdateEmail.id !== user_id) {
            throw new AppError('There is already one user with this email.');    
        }

        //verificando se o usuario nao enviou o password.
        if (password && !old_password) {
            throw new AppError('Old password is required.');
        }

        //verificando se o usuario enviou o password
        if (password && old_password ) {
            const checkOldPassword = await compare(old_password, user.password)

            //verificando se a senha antiga é a igual a nova
            if (!checkOldPassword) {
                throw new AppError('Old password does not match.');
            }
            user.password = await hash(password, 8);
        }

        //atualizando users.
        user.name = name;
        user.email = email;

        await userRepo.save(user);

        //retorna o usuario atualizado.
        return user;
    }
}

