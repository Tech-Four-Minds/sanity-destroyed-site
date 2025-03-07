import multer from "multer";
import { Request, Response } from "express";
import { PrismaProductRepository } from "../../infra/repository/product-repository/prisma-product-repository";


const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');




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
        upload(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: "Erro no upload da imagem." });
            }


        const {name, price, type, size, quantity, image } = req.body;
        const imageBuffer = req.file?.buffer;
        const priceFloat = parseFloat(price)
        const priceInt = parseInt(price)

        try {
            const product = await this.productGateway.createProduct({
                name,
                price: priceFloat,
                type,
                size,
                quantity: priceInt,
                image: imageBuffer,

            });
            res.status(201).json(product);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
        });
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

    async listProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productGateway.listProducts();
    
            const productsWithBase64Images = products.map(product => ({
                ...product,
                imageSizeKB: product.image ? (product.image.length / 1024).toFixed(2) + " KB" : "0 KB",
                image: product.image ? `data:image/;base64,${Buffer.from(product.image).toString("base64")}` : null
            }));
    
            res.status(200).json(productsWithBase64Images);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    }
    

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
                const productWithBase64Image = {
                    ...product,
                    imageSizeKB: product.image ? (product.image.length / 1024).toFixed(2) + " KB" : "0 KB",
                    image: product.image ? `data:image/;base64,${Buffer.from(product.image).toString("base64")}` : null
                };
    
                res.status(200).json(productWithBase64Image);
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
    }
    

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

    async updateProduct(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;
        const imageBuffer = req.file?.buffer;
        
        const price = data.price ? parseFloat(data.price) : undefined;
    
        
        const quantity = data.quantity ? parseInt(data.quantity) : undefined;
    
        
        const updatedData: any = {};
    
        if (price !== undefined) updatedData.price = price;
        if (quantity !== undefined) updatedData.quantity = quantity;
        if (imageBuffer) updatedData.image = imageBuffer;
        if (data.name) updatedData.name = data.name;
        if (data.type) updatedData.type = data.type;
        if (data.size) updatedData.size = data.size;
    
        try {
            const product = await this.productGateway.updateProduct(id, updatedData);
            res.status(200).json(product);
    
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