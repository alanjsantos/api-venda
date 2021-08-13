import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UserController from "../controller/UserController";

const userRoutes = Router();
const userController = new UserController();

//endpoint listar usuario
userRoutes.get('/', userController.listUser);

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

export default userRoutes;