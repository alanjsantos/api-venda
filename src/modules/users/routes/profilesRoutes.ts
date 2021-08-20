import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated"; 
import UserProfileController from "../controller/UserProfileController";

const profileRouter = Router();
const userProfileController  = new UserProfileController()

//endpoint para buscar um profile
profileRouter.get('/', isAuthenticated, userProfileController.findByUserProfile);

profileRouter.use(isAuthenticated);

//endpoint criar usuario
profileRouter.put('/', 
 celebrate({
     [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         old_password: Joi.string(),
         password: Joi.string().optional(),
         password_confirmation: Joi.string().valid(Joi.ref('password'))
                                            .when('password', {is: Joi
                                                .exist(), then: Joi
                                                .required()})
     }
 }),
 userProfileController.updateProfile
)


export default profileRouter;