import { Router } from "express";
import productesRoutes from "@modules/products/routes/ProductsRoutes";

const routes = Router();

routes.use('/products', productesRoutes)

// routes.get('/', (request, response) => { 
//     return response.json({message: 'Olá Dev'})
// })

export default routes;