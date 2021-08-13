import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UserController {

    public async listUser(request: Request, response: Response): Promise<Response>{
        const listUser = new ListUserService();
        const user = await listUser.listUser();

        return response.json(user);
    }
    
    public async createUser(request: Request, response: Response): Promise<Response>{
        const {name, email, password} = request.body;
        const userCreate = new CreateUserService();

        const user = await userCreate.createUser({name, email, password});

        return response.json(user);
    }

}