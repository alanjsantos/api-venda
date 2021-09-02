import { Request, response, Response } from "express";
import CreateOrderService from "../../../services/CreateOrderService";
import FindByIdOrderService from "../../../services/FindByIdOrderService";


export default class OrderController {

    public async findByOrder(request: Request, resposne: Response): Promise<Response> {
        const {id} =  request.params; 
        const findByIdOrder = new FindByIdOrderService()

        const order = await findByIdOrder.findByOrder({id})

        return resposne.json(order);
    }

    public async createOrder(request: Request, response: Response): Promise<Response> {
        const {customer_id, products} = request.body;
        const createOrder = new CreateOrderService();

        const order = await createOrder.createOrder({customer_id, products})

        return response.status(201).json(order);
    }

}