import { Router } from "express";
import ProductsController from "../controller/ProductsController";

const productesRoutes = Router();
const productsController = new ProductsController();

productesRoutes.get('/', productsController.listProduct);
productesRoutes.get('/:id', productsController.showProducts);
productesRoutes.post('/', productsController.createProducts);
productesRoutes.put('/:id', productsController.updateProducts)
productesRoutes.delete('/:id', productsController.deleteProducts);

export default productesRoutes;