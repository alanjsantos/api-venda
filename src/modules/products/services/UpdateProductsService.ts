import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../infra/typeorm/entities/Products";
import { ProductRepository } from "../infra/typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductsService {

    //metodo para atualizar um produto
    public async excetute({id, name, price, quantity}: IRequest): Promise<Products> {

        const productsRepo = getCustomRepository(ProductRepository);
        //buscando produto por nome
        const productExist = await productsRepo.findByName(name);

        const redisCache = new RedisCache();
  
        //buscando produto
        const product = await productsRepo.findOne(id)
        
        //verificando se existe produto
        if (!product) {
            throw new AppError('Produto not found')
        }

        //verificando se existe produto com o mesmo nome
        if (productExist) {
            throw new AppError('There is already one product with this name');
        }
        
        //atualizando os campos.
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await redisCache.invalidate('api-vendas-PRODUCT_LIST')

        await productsRepo.save(product)

        //retorna a lista dos produtos.
        return product;
    }
}

export default UpdateProductsService;