import { Router } from "express";
import productesRoutes from "@modules/products/routes/ProductsRoutes";
import userRoutes from "@modules/users/routes/UserRoutes";
import userSessionRoutes from "@modules/users/routes/UserSession";

const routes = Router();

routes.use('/products', productesRoutes);
routes.use('/users', userRoutes);
routes.use('/user-authentication', userSessionRoutes);


// routes.get('/', (request, response) => { 
//     return response.json({message: 'Olá Dev'})
// })

export default routes;      