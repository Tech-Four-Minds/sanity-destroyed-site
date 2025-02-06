import { Request, Response } from "express";
import { PrismaProductRepository } from "../../infra/repository/product-repository/prisma-product-repository";


export class ProductController {

    private productGateway: PrismaProductRepository;

    constructor() {
        this.productGateway = new PrismaProductRepository();
    }


     /**
     * @swagger
     * /products:
     *   post:
     *     summary: Cria um novo produto.
     *     security:
     *       - Auth: []
     *     description: Adiciona um novo produto ao banco de dados.
     *     tags:
     *       - Produtos
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Produtos'
     *     responses:
     *       201:
     *         description: Produto criado com sucesso.
     *       400:
     *         description: Erro na criação do produto.
     *       500:
     *         description: Erro Interno no servidor.
     */


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
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    };

    /**
     * @swagger
     * /products:
     *   get:
     *     summary: Lista todos os produtos.
     *     tags:
     *       - Produtos
     *     responses:
     *       200:
     *         description: Lista de produtos retornada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Produtos'
     *       400:
     *         description: Erro ao listar os produtos.
     *       500:
     *         description: Erro interno no servidor.
     */

    async listProducts (req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productGateway.listProducts();
            res.status(200).json(products);
        }   catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }

        
    };

    /**
     * @swagger
     * /products/{id}:
     *   get:
     *     summary: Busca um produto por ID.
     *     tags:
     *       - Produtos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do produto.
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Produto retornado com sucesso.
     *       404:
     *         description: Produto não encontrado.
     *       400:
     *         description: Erro ao buscar o produto.
     *       500:
     *         description: Erro interno no servidor.
     */

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
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    };

    /**
     * @swagger
     * /products/{id}:
     *   put:
     *     summary: Atualiza um produto existente.
     *     security:
     *       - Auth: []
     *     tags:
     *       - Produtos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do produto.
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Produtos'
     *     responses:
     *       200:
     *         description: Produto atualizado com sucesso.
     *       400:
     *         description: Erro ao atualizar o produto.
     *       404:
     *         description: Produto não encontrado.
     *       500:
     *         description: Erro interno no servidor.
     */

    async updateProduct (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;

        try {
            const product = await this.productGateway.updateProduct(id, data);
            res.status(200).json(product);

        }catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    };

    /**
     * @swagger
     * /products/{id}:
     *   delete:
     *     summary: Deleta um produto por ID.
     *     security:
     *       - Auth: []
     *     tags:
     *       - Produtos
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID do produto.
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Produto deletado com sucesso.
     *       400:
     *         description: Erro ao deletar o produto.
     *       404:
     *         description: Produto não encontrado.
     *       500:
     *         description: Erro interno no servidor.
     */

    async deleteProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.productGateway.deleteProduct(id);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
            
        }
    };
};