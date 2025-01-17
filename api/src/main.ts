import "dotenv/config"
import express, { Application } from "express";
import { productRoutes } from "./routes/products/products-route";


const app: Application = express();

app.use(express.json());

app.use("/api", productRoutes());

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});