import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from 'multer';
import UserController from "../controller/UserController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated"; 
import UserAvatarController from "../controller/UserAvatarController";
import uploadConfig from '@config/upload'

const userRoutes = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController()
const upload = multer(uploadConfig);

//endpoint listar usuario
userRoutes.get('/', isAuthenticated, userController.listUser);

//endpoint criar usuario
userRoutes.post('/', 
 celebrate({
     [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
         password: Joi.string().required()
     }
 }),
 userController.createUser
)
//endpoint para mudar avatar
userRoutes.patch('/update-avatar', isAuthenticated, upload.single('avatar'), userAvatarController.updateUserAvatar);

export default userRoutes;