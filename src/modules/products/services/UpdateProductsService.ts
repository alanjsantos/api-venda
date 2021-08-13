import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Products from "../typeorm/entities/Products";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

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

        await productsRepo.save(product)

        //retorna a lista dos produtos.
        return product;
    }
}

export default UpdateProductsService;