import { Router } from "express";
import { ProductController } from "../../controllers/products/productController";
import { authenticateRequest } from "../../infra/middlewares/authenticateRequest";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('image');

export const productRoutes = () => {

    const productController = new ProductController();

    const routerProduct = Router();

    routerProduct.post("/products/", authenticateRequest, productController.createProduct.bind(productController));
    routerProduct.get("/products/", productController.listProducts.bind(productController));
    routerProduct.get("/products/:id", productController.getProductById.bind(productController));
    routerProduct.put("/products/:id", authenticateRequest, upload ,productController.updateProduct.bind(productController));
    routerProduct.delete("/products/:id", authenticateRequest,productController.deleteProduct.bind(productController));


    return routerProduct;
}