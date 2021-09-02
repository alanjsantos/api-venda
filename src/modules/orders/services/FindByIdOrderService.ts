import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Orders from "../infra/typeorm/entities/Orders";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";

interface IRequest {
    id: string;
}

export default class FindByIdOrderService {

    //metodo para criar um pedido
    public async findByOrder({id}: IRequest): Promise<Orders> {

        const orderRepo = getCustomRepository(OrdersRepository);
        const order = await orderRepo.findById(id)

        //verificando se existe order
        if(!order){
            throw new AppError('Order not found.')
        }

        //retorna o produto salvo.
        return order;
    }

}

