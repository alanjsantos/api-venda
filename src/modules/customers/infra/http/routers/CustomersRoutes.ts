import { Router } from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import CustomersController from "../controller/CustomersController";

const customerRoutes = Router();
const customerController = new CustomersController();

//endpoint listar customer
customerRoutes.get('/', isAuthenticated, customerController.listCustomer);

//endpoint buscar por customer por id
customerRoutes.get('/:id', isAuthenticated,
 celebrate({
     [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
             }
           }),  
customerController.findByIdCustomer);

//endpoint criar customer
customerRoutes.post('/', isAuthenticated,
 celebrate({
     [Segments.BODY]: {
         name: Joi.string().required(),
         email: Joi.string().email().required(),
     }
 }),
 customerController.createCustomer);

//endpoint atualizar customer
customerRoutes.put('/:id', isAuthenticated,
celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
            }
}),
customerController.updateCustomer)

//endpoint deletar customer.
customerRoutes.delete('/:id', isAuthenticated,
celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
            }
          }),  
customerController.deleteCustomer);

//endpoint user session


export default customerRoutes;