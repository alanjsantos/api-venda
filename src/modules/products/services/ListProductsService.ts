import { getCustomRepository } from "typeorm";
import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import RedisCache from "@shared/cache/RedisCache";

class ListProductsService {

    //metodo para criar um produto
    public async excetute(): Promise<Products[]> {

        const productsRepo = getCustomRepository(ProductRepository);

        const redisCache = new RedisCache();
  
        //buscando todos os produtos
        const listProducts = productsRepo.find()
        
        await redisCache.save('Teste', 'teste');

        //retorna a lista dos produtos.
        return listProducts;
    }
}

export default ListProductsService;