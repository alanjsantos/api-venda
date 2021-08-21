import { getCustomRepository } from "typeorm";
import Customers from "../typeorm/entities/Customers";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";


export default class ListCustomersService {

    //metodo para lsitar os customers.
    public async listCustomers(): Promise<Customers[]> {

        const customersRepo = getCustomRepository(CustomersRepository);
  
        //buscando todos os customers
        const customers = customersRepo.find()
        

        //retorna a lista dos customers.
        return customers;
    }
}

