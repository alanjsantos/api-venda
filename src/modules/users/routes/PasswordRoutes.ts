import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswordController from "../controller/ForgotPasswordController";

const passwordRouter = Router();
const forgotPaswordController = new ForgotPasswordController();

//endpoint criar usuario
passwordRouter.post('/forgot', 
 celebrate({
     [Segments.BODY]: {
         email: Joi.string().email().required(),
     }
 }),
 forgotPaswordController.createUserToken
)

export default passwordRouter;