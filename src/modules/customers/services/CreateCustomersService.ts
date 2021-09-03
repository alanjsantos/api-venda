import AppError from "@shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import Customers from "../infra/typeorm/entities/Customers";

//recebdno o objeto do usuario que sera salvo.
interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomersService {
    constructor(private customersRepo: ICustomersRepository) {
    }

    //metodo para criar um produto
    public async createCustomer({name, email}: IRequest): Promise<Customers> {
        const customerstExist = await this.customersRepo.findByEmail(email);
        
        //verificando se existe produto com este mesmo nome
        if(customerstExist){
            throw new AppError('There is already one Customers with this email.')
        }

        //cria o customer
        const customers = await this.customersRepo.create({
            name,
            email,
        })

        //retorna o customers salvo.
        return customers;
    }
}

