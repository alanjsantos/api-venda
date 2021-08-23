import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customers from "../typeorm/entities/Customers";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomersService {

    //metodo para atualizar um customer
    public async updateCustomer({id, name, email}: IRequest): Promise<Customers> {

        const customersRepo = getCustomRepository(CustomersRepository);
        
        //buscando customer
        const customers = await customersRepo.findById(id)
        
        //verificando se existe customer
        if (!customers) {
            throw new AppError('Customer not found')
        }
        
        //buscando customer por email
        const customerEmailExist = await customersRepo.findByEmail(email)

        //verificando se existe customer com o mesmo nome
        if (customerEmailExist && email !== customers.email) {
            throw new AppError('There is already one Customer with this email');
        }
        
        //atualizando os campos.
        customers.name = name;
        customers.email = email;

        await customersRepo.save(customers)

        //retorna a lista dos customers.
        return customers;
    }
}

