import Customers from "@modules/customers/typeorm/entities/Customers";
import { EntityRepository, Repository } from "typeorm";
import Orders from "../entities/Orders";
import OrdersProducts from "../entities/OrdersProducts";

interface IProducts {
    product_id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customers;
    products: IProducts[]
}

@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders>{

    public async findById(id: string): Promise<Orders | undefined> {
        const orders = this.findOne(id, {
            relations: ['order_products', 'customer']
        })
        return orders;
    }
    public async createOrder({customer, products}: IRequest): Promise<Orders> {
        const order = this.create({customer, order_products: products})

        await this.save(order);

        return order;
    }
}