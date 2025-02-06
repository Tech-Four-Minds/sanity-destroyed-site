import { Response, Request } from "express";
import { PrismaNewRepository } from "../../infra/repository/new-repository/prisma-news-repository";

export class NewsController {

    private newsGateway: PrismaNewRepository;

    constructor() {
        this.newsGateway = new PrismaNewRepository()
    }
    

     /**
     * @swagger
     * /news:
     *   post:
     *     summary: Cria uma nova notícia.
     *     security:
     *       - Auth: []
     *     description: Adiciona uma nova notícia ao banco de dados.
     *     tags:
     *       - Notícias
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Noticias'
     *     responses:
     *       201:
     *         description: Notícia criada com sucesso.
     *       400:
     *         description: Erro na criação da notícia.
     *       500:
     *         description: Erro interno no servidor.
     */

    async createNews (req: Request, res: Response): Promise<void> {
        const {name, date, description} = req.body;
        try {
            const news = await this.newsGateway.createNews({
                name, 
                date, 
                description
            });
            res.status(201).json(news)
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
     * /news:
     *   get:
     *     summary: Lista todas as notícias.
     *     tags:
     *       - Notícias
     *     responses:
     *       200:
     *         description: Lista de notícias retornada com sucesso.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Noticias'
     *       400:
     *         description: Erro ao listar as notícias.
     *       500:
     *         description: Erro interno no servidor.
     */

    async listNews (req: Request, res: Response): Promise<void> {
        try {
            const news = await this.newsGateway.listNews();
            res.status(200).json(news);
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
     * /news/{id}:
     *   get:
     *     summary: Busca uma notícia por ID.
     *     tags:
     *       - Notícias
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: Notícia retornada com sucesso.
     *       404:
     *         description: Notícia não encontrada.
     *       400:
     *         description: Erro ao buscar a notícia.
     *       500:
     *         description: Erro interno no servidor.
     */

    async getNewsById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            const news = await this.newsGateway.getNewsById(id);
            if (news) {
                res.status(200).json(news);
            } else {
                res.status(404).json({ error: "Notícia não encontrado" });
            }
        } catch (error) {
            res.status(400).json({error: (error as Error).message});
        }
    };

    /**
     * @swagger
     * /news/{id}:
     *   put:
     *     summary: Atualiza uma notícia existente.
     *     security:
     *       - Auth: []
     *     tags:
     *       - Notícias
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Noticias'
     *     responses:
     *       200:
     *         description: Notícia atualizada com sucesso.
     *       400:
     *         description: Erro ao atualizar a notícia.
     *       404:
     *         description: Notícia não encontrado.
     *       500:
     *         description: Erro interno no servidor.
     */

    async updateNews (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;

        try {
            const news = await this.newsGateway.updateNews(id, data);
            res.status(200).json(news);

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
     * /news/{id}:
     *   delete:
     *     summary: Deleta uma notícia por ID.
     *     security:
     *       - Auth: []
     *     tags:
     *       - Notícias
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       204:
     *         description: Notícia deletada com sucesso.
     *       400:
     *         description: Erro ao deletar a notícia.
     *       500:
     *         description: Erro interno no servidor.
     */

    async deleteNews(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.newsGateway.deleteNews(id);
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

    





