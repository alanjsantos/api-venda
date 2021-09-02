import { getCustomRepository } from "typeorm";
import Customers from "../infra/typeorm/entities/Customers";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface IPaginateCustomer {
    from: number;
    to: number;
    per_page: number;
    total: number;
    current_page: number;
    prev_page: number | null;
    next_page: number | null;
    data: Customers[]
}

export default class ListCustomersService {

    //metodo para lsitar os customers.
    public async listCustomers(): Promise<IPaginateCustomer> {

        const customersRepo = getCustomRepository(CustomersRepository);
  
        //buscando todos os customers
        const customers = await customersRepo.createQueryBuilder().paginate();
    
        

        //retorna a lista dos customers.
        return customers as IPaginateCustomer
    }
}

