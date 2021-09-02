import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../infra/typeorm/entities/Products";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

//tipando o objeto que irá ser salvo
interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductsService {

    //metodo para criar um produto
    public async excetute({name, price, quantity}: IRequest): Promise<Products> {

        const productsRepo = getCustomRepository(ProductRepository);
        const productExist = await productsRepo.findByName(name);
        const redisCache = new RedisCache();

        
        //verificando se existe produto com este mesmo nome
        if(productExist){
            throw new AppError('There is already one product with this name.')
        }
        //cria o produto
        const product = productsRepo.create({
            name,
            price,
            quantity,
        })

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')
        
        //salva o produto
        await productsRepo.save(product);

        //retorna o produto salvo.
        return product;
    }
}

export default CreateProductsService;