import { Router } from "express";
import productesRoutes from "@modules/products/infra/http/routes/ProductsRoutes";
import userRoutes from "@modules/users/infra/http/routes/UserRoutes";
import userSessionRoutes from "@modules/users/infra/http/routes/UserSession";
import passwordRouter from "@modules/users/infra/http/routes/PasswordRoutes";
import profileRouter from "@modules/users/infra/http/routes/profilesRoutes";
import customerRoutes from "@modules/customers/infra/http/routers/CustomersRoutes";
import ordersRoutes from "@modules/orders/infra/http/routes/OrderRoutes";

const routes = Router();

routes.use('/products', productesRoutes);
routes.use('/users', userRoutes);
routes.use('/user-authentication', userSessionRoutes);
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customerRoutes)
routes.use('/orders', ordersRoutes)
// routes.get('/', (request, response) => { 
//     return response.json({message: 'Olá Dev'})
// })

export default routes;      