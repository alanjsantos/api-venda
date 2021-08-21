import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customers from "../typeorm/entities/Customers";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string
}

export default class ShowCustomersService {

    //metodo para criar um customers
    public async findByCustomers({id}: IRequest): Promise<Customers> {

        const customersRepo = getCustomRepository(CustomersRepository);
  
        //buscando o customer
        const customers = await customersRepo.findOne(id)
        
        if (!customers) {
            throw new AppError('Customer does not exist!')
        }

        //retornando o customer encontrado..
        return customers;
    }
}

