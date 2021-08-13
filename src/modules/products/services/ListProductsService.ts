import { getCustomRepository } from "typeorm";
import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";


class ListProductsService {

    //metodo para criar um produto
    public async excetute(): Promise<Products[]> {

        const productsRepo = getCustomRepository(ProductRepository);
  
        //buscando todos os produtos
        const listProducts = productsRepo.find()
        

        //retorna a lista dos produtos.
        return listProducts;
    }
}

export default ListProductsService;