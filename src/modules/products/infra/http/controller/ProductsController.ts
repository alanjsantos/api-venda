import { Request, response, Response } from "express";
import CreateProductsService from "../../../services/CreateProductsService";
import DeleteProductsService from "../../../services/DeleteProductsService";
import ListProductsService from "../../../services/ListProductsService";
import ShowProductsService from "../../../services/ShowProductsService";
import UpdateProductsService from "../../../services/UpdateProductsService";

export default class ProductsController {
    public async listProduct(request: Request, response: Response): Promise<Response> {
        const listProducts = new ListProductsService();
        
        const products = await listProducts.excetute();

        return response.json(products);
    }

    public async showProducts(request: Request, resposne: Response): Promise<Response> {
        const {id } =  request.params; 
        const showProducts = new ShowProductsService()

        const product = await showProducts.excetute({id});

        return resposne.json(product);
    }

    public async createProducts(request: Request, response: Response): Promise<Response> {
        const {name, price, quantity} = request.body;
        const createProducts = new CreateProductsService();

        const product = await createProducts.excetute({name, price, quantity});

        return response.json(product);
    }

    public async updateProducts(request: Request, resposne: Response): Promise<Response> {
        const {name, price, quantity} = request.body;
        const {id} = request.params;

        const updateProducts = new UpdateProductsService();

        const product = await updateProducts.excetute({id, name, price, quantity});

        return response.json(product);
    }

    public async deleteProducts(request: Request, response: Response): Promise<Response> {
        const {id} = request.params;
        const deleteProducts = new DeleteProductsService();

        await deleteProducts.excetute({id});

        return response.json([]);
    }
}