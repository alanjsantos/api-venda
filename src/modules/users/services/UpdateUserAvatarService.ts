import upload from "@config/upload";
import AppError from "@shared/errors/AppError";
import path from "path";
import { getCustomRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import UserRepository from "../infra/typeorm/repositories/UsersRepository";
import fs from 'fs';

interface IRequest {
    id: string;
    avatarFileName: string;
}

export default class UpdateUserAvatarService {

    //metodo para criar um produto
    public async updateUserAvatar({id, avatarFileName}: IRequest): Promise<User> {
        const userRepo = getCustomRepository(UserRepository);
        const user = await userRepo.findById(id);

        //verificar se o usuario existe.
        if(!user) {
            throw new AppError('User not found. ');
        }

        //verificando se o usuario tem um avatar.
        if(user.avatar) {
            //juntando o diretoria com o avatar do usuario
            const userAvatarFilePath = path.join(upload.directory, user.avatar);

            //pegando o status do arquivo
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

            //verificando se o avatar existe para remover.
            if(userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        
        //cadastrando o avatar novo
        user.avatar = avatarFileName;

        //atualizando um novo avatar.
        await userRepo.save(user)

        return user;
    
    }
}