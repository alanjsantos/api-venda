import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {
    
    public async updateUserAvatar(request: Request, response: Response): Promise<Response>{
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = updateUserAvatar.updateUserAvatar({
            id: request.user.id,
            avatarFileName: request.file?.fieldname as string
        });


        return response.json(user);
    }

}