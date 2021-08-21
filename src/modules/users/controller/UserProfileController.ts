import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";


export default class UserProfileController {

    public async findByUserProfile(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id
        const showProfileService = new ShowProfileService();
        
        const user = await showProfileService.findByUser({user_id})

        return response.json(user);
    }

    public async updateProfile(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id
        const {name, email, password, old_password} = request.body;
        const updateProfileService = new UpdateProfileService();
        
        const user = await updateProfileService.updateProfile({user_id, name, email, password, old_password})

        return response.json(user);
    }
    
}