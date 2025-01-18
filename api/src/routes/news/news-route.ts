import { Router } from "express";
import { NewsController } from "../../controllers/news/newsController";
import { InMemoryNewsRepository } from "../../infra/repository/new-repository.spec.ts/news-repository";

const newsGateway = new InMemoryNewsRepository
const newsController= new NewsController(newsGateway)

export const newsRouter = () => {

    const routerNews = Router();

    routerNews.post("/news/post", newsController.createNews.bind(newsController));
    routerNews.get("/news/get", newsController.listNews.bind(newsController));
    routerNews.get("/news/:id", newsController.getNewsById.bind(newsController));
    routerNews.put("/news/:id", newsController.updateNews.bind(newsController));
    routerNews.delete("/news/:id", newsController.deleteNews.bind(newsController));

    return routerNews;

}