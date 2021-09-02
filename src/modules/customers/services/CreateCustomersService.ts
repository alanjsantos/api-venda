import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customers from "../infra/typeorm/entities/Customers";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

//recebdno o objeto do usuario que sera salvo.
interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomersService {

    //metodo para criar um produto
    public async createCustomer({name, email}: IRequest): Promise<Customers> {

        const customersRepo = getCustomRepository(CustomersRepository);
        const customerstExist = await customersRepo.findByEmail(email);
        
        //verificando se existe produto com este mesmo nome
        if(customerstExist){
            throw new AppError('There is already one Customers with this email.')
        }

        //cria o customer
        const customers = customersRepo.create({
            name,
            email,
        })
        
        //salva o customers
        await customersRepo.save(customers);

        //retorna o customers salvo.
        return customers;
    }
}

