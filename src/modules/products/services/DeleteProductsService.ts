import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string
}

class DeleteProductsService {

    //metodo para criar um produto
    public async excetute({id}: IRequest): Promise<void> {

        const productsRepo = getCustomRepository(ProductRepository);
        const redisCache = new RedisCache();
  
        //buscando todos os produtos
        const products = await productsRepo.findOne(id)
        
        if (!products) {
            throw new AppError('Produto não existe!')
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        //deletando produto
        await productsRepo.remove(products);

    }
}

export default DeleteProductsService;