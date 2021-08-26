import { Request, response, Response } from "express";
import CreateCustomersService from "../services/CreateCustomersService";
import DeleteCustomersService from "../services/DeleteCustomersService";
import FindByIdCustomer from "../services/FindByIdCustomer";
import ListCustomersService from "../services/ListCustomersService";
import UpdateCustomersService from "../services/UpdateCustomersService";

export default class CustomersController {

    public async listCustomer(request: Request, response: Response): Promise<Response> {
        const listCustomer = new ListCustomersService();
        
        const customer = await listCustomer.listCustomers()

        return response.json(customer);
    }

    public async findByIdCustomer(request: Request, resposne: Response): Promise<Response> {
        const {id } =  request.params; 
        const customerFindById = new FindByIdCustomer()

        const customer = await customerFindById.findByCustomers({id})

        return resposne.json(customer);
    }

    public async createCustomer(request: Request, response: Response): Promise<Response> {
        const {name, email} = request.body;
        const createCustomer = new CreateCustomersService();

        const customer = await createCustomer.createCustomer({name, email})
        return response.status(201).json(customer);
    }

    public async updateCustomer(request: Request, response: Response): Promise<Response> {
        const {name, email} = request.body;
        const {id} = request.params;

        const updateCustomer = new UpdateCustomersService();

        const customer = await updateCustomer.updateCustomer({id, name, email})

        return response.json(customer);
    }

    public async deleteCustomer(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteCustomer = new DeleteCustomersService();

        await deleteCustomer.deleteCustomer({id})

        return response.status(204).json([]);
    }
}