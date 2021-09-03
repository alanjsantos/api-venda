import { ICreatedCustomer } from "@modules/customers/domain/models/ICreatedCustomer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { getRepository, Repository } from "typeorm";
import Customers from "../entities/Customers";

export default class CustomersRepository implements ICustomersRepository{
    private ormRepository: Repository<Customers>;
    
    constructor() {
        this.ormRepository = getRepository(Customers);
    }
    public async create({name, email}: ICreatedCustomer): Promise<Customers> {
        const customer =  this.ormRepository.create({
            name,
            email
        })
        await this.ormRepository.save(customer);

        return customer;
    }

    public async save(customer: Customers): Promise<Customers> {
        await this.ormRepository.save(customer);

        return customer;
    }

    public async findByName(name: string): Promise<Customers | undefined>{
        const customers = await this.ormRepository.findOne({
            where: {
                name,
            }
        })
        return customers;
    }

    public async findById(id: string): Promise<Customers | undefined>{
        const customers = await this.ormRepository.findOne({
            where: {
                id,
            }
        })
        return customers;
    }

    public async findByEmail(email: string): Promise<Customers | undefined>{
        const customers = await this.ormRepository.findOne({
            where: {
                email,
            }
        })
        return customers;
    }
}