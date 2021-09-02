import { Request, Response } from "express";
import CreateUserService from "../../../services/CreateUserService";
import ListUserService from "../../../services/ListUserService";
import ResetPasswordService from "../../../services/ResetPasswordService";

export default class ResetPasswordController {
    
    public async createUserToken(request: Request, response: Response): Promise<Response>{
        const {token, password} = request.body;
        const resetPasswordService = new ResetPasswordService();

        await resetPasswordService.resetPassword({
            token,
            password
        })

        return response.status(204).json();
    }

}