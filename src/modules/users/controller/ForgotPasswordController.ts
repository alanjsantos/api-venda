import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
    
    public async createUserToken(request: Request, response: Response): Promise<Response>{
        const {email} = request.body;
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

        await sendForgotPasswordEmail.sendEmailUser({
            email
        })

        return response.status(204).json();
    }

}