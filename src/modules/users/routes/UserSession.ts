import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UserSessionController from "../controller/UserSessionController";

const userSessionRoutes = Router();
const userSession = new UserSessionController();

//endpoint criar usuario
userSessionRoutes.post('/', 
 celebrate({
     [Segments.BODY]: {
         email: Joi.string().email().required(),
         password: Joi.string().required()
     }
 }),
 userSession.authentication
)

export default userSessionRoutes;