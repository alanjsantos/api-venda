import { EntityRepository, Repository } from "typeorm";
import Customers from "../entities/Customers";

@EntityRepository(Customers)
export default class CustomersRepository extends Repository<Customers> {

    public async findByName(name: string): Promise<Customers | undefined>{
        const customers = await this.findOne({
            where: {
                name,
            }
        })
        return customers;
    }

    public async findById(id: string): Promise<Customers | undefined>{
        const customers = await this.findOne({
            where: {
                id,
            }
        })
        return customers;
    }

    public async findByEmail(email: string): Promise<Customers | undefined>{
        const customers = await this.findOne({
            where: {
                email,
            }
        })
        return customers;
    }
}