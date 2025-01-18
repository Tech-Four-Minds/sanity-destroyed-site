import { Response, Request } from "express";
import { NewsGateway } from "../../domain/gateway/news.gateway";

export class NewsController {
    private newsGateway: NewsGateway;

    constructor(newsGateway: NewsGateway){
        this.newsGateway = newsGateway
    };

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
            res.status(400).json({ error: (error as Error).message})
            
        }
    };

    async listNews (req: Request, res: Response): Promise<void> {
        try {
            const news = await this.newsGateway.listNews();
            res.status(200).json(news);
        }   catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };

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

    async updateNews (req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const data = req.body;

        try {
            const news = await this.newsGateway.updateNews(id, data);
            res.status(200).json(news);

        }catch (error) {
            res.status(400).json({ error: (error as Error).message});
        }
    };

    async deleteNews(req: Request, res: Response): Promise<void> {
        const { id } = req.params;

        try {
            await this.newsGateway.deleteNews(id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: (error as Error).message})
            
        }
    };


    };

    





