import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswordController from "../controller/ForgotPasswordController";
import ResetPasswordController from "../controller/ResetPasswordController";

const passwordRouter = Router();
const forgotPaswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

//endpoint criar usuario
passwordRouter.post('/forgot', 
 celebrate({
     [Segments.BODY]: {
         email: Joi.string().email().required(),
     }
 }),
 forgotPaswordController.createUserToken
)

passwordRouter.post('/reset', 
 celebrate({
     [Segments.BODY]: {
         token: Joi.string().uuid().required(),
         password: Joi.string().required(),
         password_confirmation: Joi.string().required().valid(Joi.ref('password'))
     }
 }),
 resetPasswordController.createUserToken
)

export default passwordRouter;