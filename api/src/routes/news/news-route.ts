import { Router } from "express";
import { NewsController } from "../../controllers/news/newsController";
import { PrismaNewRepository } from "../../infra/repository/new-repository/prisma-news-repository";

const newsGateway = new PrismaNewRepository
const newsController= new NewsController(newsGateway)

export const newsRouter = () => {

    const routerNews = Router();

    routerNews.post("/news/", newsController.createNews.bind(newsController));
    routerNews.get("/news/", newsController.listNews.bind(newsController));
    routerNews.get("/news/:id", newsController.getNewsById.bind(newsController));
    routerNews.put("/news/:id", newsController.updateNews.bind(newsController));
    routerNews.delete("/news/:id", newsController.deleteNews.bind(newsController));

    return routerNews;

}