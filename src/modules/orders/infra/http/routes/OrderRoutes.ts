import { Router } from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
import OrderController from "../controller/OrderController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const ordersRoutes = Router();
const ordersController = new OrderController();


//endpoint buscar por products por id
ordersRoutes.get('/:id', isAuthenticated,
 celebrate({
     [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
             }
           }),  
           ordersController.findByOrder);


//endpoint criar products
ordersRoutes.post('/', isAuthenticated,
 celebrate({
     [Segments.BODY]: {
         customer_id: Joi.string().uuid().required(),
         products: Joi.required()
     }
 }),
 ordersController.createOrder);


export default ordersRoutes;