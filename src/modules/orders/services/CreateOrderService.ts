import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Orders from "../typeorm/entities/Orders";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";

interface IProducts {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProducts[]

}

export default class CreateOrderService {

    //metodo para criar um pedido
    public async createOrder({customer_id, products}: IRequest): Promise<Orders> {

        const orderRepo = getCustomRepository(OrdersRepository);
        const customerRepo = getCustomRepository(CustomersRepository);
        const productRepo = getCustomRepository(ProductRepository);

        //verificando se existe cliente na base de dados.
        const customerExists = await customerRepo.findById(customer_id);

        if(!customerExists){
            throw new AppError('Could not find aby Customer with thes ID')
        }

        //verificando se existe produtos
        const existsProducts = await productRepo.findAllByIds(products)

        if (!existsProducts.length) {
            throw new AppError('Could not find aby prodcuts with thes IDs');
        }

        //verificando se ids de produtos
        const existsProductsIds = existsProducts.map((product) => product.id);

        //checando produtos inexistente.
        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id)
        )

        if (checkInexistentProducts) {
            throw new AppError(`Could not find ${checkInexistentProducts[0].id}`);
        }

        //verificando se a quantidade de produto enviada é maior que a quantidade existente no banco.
        const quantityAvailable = products.filter(
            product => existsProducts.filter(
                p => p.id == product.id
            )[0].quantity < product.quantity
        )
        
        if (quantityAvailable.length) {
            throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`);
        }

        const serializedProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id == product.id)[0].price
            })
        )
        
        //criando order para salvar
        const order = await orderRepo.createOrder({
            customer: customerExists,
            products: serializedProducts
        })
        
        const  {order_products} = order

        //atualizando a quantidade de cada produto em estoque
        const updateProductQuantity = order_products.map(
            product => ({
                id: product.product_id,
                quantity: existsProducts.filter(p => p.id == product.id)[0].quantity - product.quantity, 
            })
        )

        await productRepo.save(updateProductQuantity);
        //retorna o produto salvo.
        return order;
    }


}

