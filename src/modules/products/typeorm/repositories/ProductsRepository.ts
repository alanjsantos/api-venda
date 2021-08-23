import { EntityRepository, In, Repository } from "typeorm";
import Products from "../entities/Products";

interface IFindProducts {
    id: string;
}

@EntityRepository(Products)
export class ProductRepository extends Repository<Products>{

    public async findByName(name: string): Promise<Products | undefined> {
        const product = this.findOne({
            where: {
                name,
            }
        })
        return product;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Products[]> {
        const productIds = products.map(products => products.id)
        
        const existsProductsIds = await this.find({
            where: {
                id: In(productIds)
            }
        })
        return existsProductsIds;
    }
}