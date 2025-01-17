import { Request, Response } from "express";
import { ProductGateway } from "../../domain/gateway/products.gateway";


export class ProductController {
    private productGateway: ProductGateway;
    
    constructor(productGateway: ProductGateway) {
        this.productGateway = productGateway;
    }

    async createProduct (req: Request, res: Response): Promise<void> {
        const {name, price, type, size, quantity, image } = req.body;
        try {
            const product = await this.productGateway.createProduct({
                name,
                price,
                type,
                size,
                quantity,
                image,

            });
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message})
        }
    };

    async listProducts (req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productGateway.listProducts();
            res.status(200).json(products);
        }   catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }

        
    };

    async getProductById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const product = await this.productGateway.getProductById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: "Produto não encontrado" });
            }
        } catch (error) {
            res.status(400).json({error: (error as Error).message});
        }
    };

    async updateProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;

        try {
            const product = await this.productGateway.updateProduct(id, data);
            res.status(200).json(product);

        }catch (error) {
            res.status(400).json({ error: (error as Error).message});
        }
    };

    async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.productGateway.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: (error as Error).message})
            
        }
    };
};