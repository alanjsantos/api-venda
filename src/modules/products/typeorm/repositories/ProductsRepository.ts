import { EntityRepository, Repository } from "typeorm";
import Products from "../entities/Products";

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
}