import { Response, Request } from "express";
import { PrismaNewRepository } from "../../infra/repository/new-repository/prisma-news-repository";
import multer from "multer";


const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');


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
        upload(req, res, async (err: any) => {
            if (err) {
                return res.status(400).json({ error: "Erro no upload da imagem." });
            }
        const {name, date, description, image} = req.body;
        const imageBuffer = req.file?.buffer;

        try {
            const news = await this.newsGateway.createNews({
                name, 
                date, 
                description,
                image: imageBuffer,
            });
            res.status(201).json(news)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
            
        }
        })
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

    async listNews(req: Request, res: Response): Promise<void> {
        try {
            const news = await this.newsGateway.listNews();
    
            // Iterando sobre um array de notícias
            const newsWithBase64Images = news.map((newsItem) => ({
                ...newsItem,
                date: newsItem.date ? newsItem.date.toLocaleDateString('pt-BR') : null,
                image: newsItem.image ? `data:image/;base64,${Buffer.from(newsItem.image).toString("base64")}` : null
            }));

    
            res.status(200).json(newsWithBase64Images);
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
            const newsWithBase64Image = {
                ...news,
                date: news.date ? news.date.toLocaleDateString('pt-BR') : null,
                imageSizeKB: news.image ? (news.image.length / 1024).toFixed(2) + " KB" : "0 KB",
                image: news.image ? `data:image/;base64,${Buffer.from(news.image).toString("base64")}` : null
            };
            res.status(200).json(newsWithBase64Image);
        } else {
            res.status(404).json({ error: "Notícia não encontrada" });
        }
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

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

    async updateNews(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;
        const imageBuffer = req.file?.buffer;
    
        const updatedData = {
            ...data,
            image: imageBuffer || data.image,  
        };
    
        try {
            const updatedNews = await this.newsGateway.updateNews(id, updatedData);
            res.status(200).json(updatedNews);
    
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

    





