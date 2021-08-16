import { Router } from "express";
import ProductsController from "../controller/ProductsController";
import { celebrate, Joi, errors, Segments } from "celebrate";
import isAuthenticated from "@modules/users/middlewares/isAuthenticated";

const productesRoutes = Router();
const productsController = new ProductsController();

//endpoint listar products
productesRoutes.get('/', isAuthenticated, productsController.listProduct);

//endpoint buscar por products por id
productesRoutes.get('/:id', isAuthenticated,
 celebrate({
     [Segments.PARAMS]: {
         id: Joi.string().uuid().required(),
             }
           }),  
productsController.showProducts);

//endpoint criar products
productesRoutes.post('/', isAuthenticated,
 celebrate({
     [Segments.BODY]: {
         name: Joi.string().required(),
         price: Joi.number().precision(2).required(),
         quantity: Joi.number().required()
     }
 }),
productsController.createProducts);

//endpoint atualizar products
productesRoutes.put('/:id', isAuthenticated,
celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required()
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
            }
}),
productsController.updateProducts)

//endpoint deletar products.
productesRoutes.delete('/:id', isAuthenticated,
celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
            }
          }),  
productsController.deleteProducts);

//endpoint user session


export default productesRoutes;