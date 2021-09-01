import { getCustomRepository } from "typeorm";
import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import RedisCache from "@shared/cache/RedisCache";

export default class ListProductsService {

    //metodo para criar um produto
    public async excetute(): Promise<Products[]> {

        const productsRepo = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();

        //buscando produtos direto do cache.
        let products = await redisCache.recover<Products[]>('api-vendas-PRODUCT_LIST')
        
        //buscando produtos do redisCache
        if (!products) {
            //buscando todos os produtos do banco de dados
            products = await productsRepo.find()

            //buscando produtos com cache
            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }
        //retorna a lista dos produtos.
        return products;
    }
}

