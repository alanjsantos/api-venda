import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string
}

class DeleteProductsService {

    //metodo para criar um produto
    public async excetute({id}: IRequest): Promise<void> {

        const productsRepo = getCustomRepository(ProductRepository);
  
        //buscando todos os produtos
        const products = await productsRepo.findOne(id)
        
        if (!products) {
            throw new AppError('Produto não existe!')
        }

        //deletando produto
        await productsRepo.remove(products);

    }
}

export default DeleteProductsService;