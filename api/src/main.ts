import "dotenv/config"
import cors from "cors";
import express, { Application } from "express";
import { productRoutes } from "./routes/products/products-route";
import { eventRoutes } from "./routes/events/events-route";
import { newsRoutes } from "./routes/news/news-route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpecs } from "./swagger-config";
import { userRoutes } from "./routes/users/users-route";
import { authRoutes } from "./routes/users/authenticate-route";
import { authenticateRequest } from "./infra/middlewares/authenticateRequest";


const app: Application = express();
app.use(cors())
app.use(express.json());


app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use("/api", productRoutes());
app.use("/api", eventRoutes());
app.use("/api", newsRoutes());
app.use("/api", userRoutes());
app.use("/api", authRoutes());
app.use(authenticateRequest); 

const PORT = process.env.PORT || 3333;

const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log(`Documentação disponivel em http://localhost:${PORT}/docs`)
});

export { app, server }