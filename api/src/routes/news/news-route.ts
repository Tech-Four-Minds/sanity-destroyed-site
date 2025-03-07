import { Router } from "express";
import { NewsController } from "../../controllers/news/newsController";
import { authenticateRequest } from "../../infra/middlewares/authenticateRequest";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');


export const newsRoutes = () => {

    const newsController = new NewsController();

    const routerNews = Router();

    routerNews.post("/news/", authenticateRequest ,newsController.createNews.bind(newsController));
    routerNews.get("/news/", newsController.listNews.bind(newsController));
    routerNews.get("/news/:id", newsController.getNewsById.bind(newsController));
    routerNews.put("/news/:id", authenticateRequest , upload, newsController.updateNews.bind(newsController));
    routerNews.delete("/news/:id", authenticateRequest ,newsController.deleteNews.bind(newsController));

    return routerNews;

}