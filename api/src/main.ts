import "dotenv/config"
import express, { Application } from "express";
import { productRoutes } from "./routes/products/products-route";
import { eventRoutes } from "./routes/events/events-route";
import { newsRouter } from "./routes/news/news-route";


const app: Application = express();

app.use(express.json());

app.use("/api", productRoutes());
app.use("/api", eventRoutes());
app.use("/api", newsRouter());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});