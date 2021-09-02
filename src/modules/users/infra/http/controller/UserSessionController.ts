import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import CreaSessionService from "../../../services/CreateSessionService";


export default class UserSessionController {

    public async authentication(request: Request, response: Response): Promise<Response>{
        const {email, password} = request.body;
        const userAuthentication = new CreaSessionService()

        const user = await userAuthentication.userAuthentication({email, password});

        return response.json(classToClass(user));
    }
    
}