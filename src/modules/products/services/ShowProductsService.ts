import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string
}

class ShowProductsService {

    //metodo para criar um produto
    public async excetute({id}: IRequest): Promise<Products | undefined> {

        const productsRepo = getCustomRepository(ProductRepository);
  
        //buscando todos os produtos
        const products = productsRepo.findOne(id)
        
        if (!products) {
            throw new AppError('Produto não existe!')
        }

        //retorna a lista dos produtos.
        return products;
    }
}

export default ShowProductsService;