import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string
}

export default class DeleteCustomersService {

    //metodo para criar um customer
    public async deleteCustomer({id}: IRequest): Promise<void> {

        const customersRepo = getCustomRepository(CustomersRepository);
  
        //buscando todos o customers
        const customers = await customersRepo.findOne(id)
        
        if (!customers) {
            throw new AppError('Customer não existe!')
        }

        //deletando customer
        await customersRepo.remove(customers);

    }
}

