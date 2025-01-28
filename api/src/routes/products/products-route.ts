import { Router } from "express";
import { ProductController } from "../../controllers/products/productController";
import { PrismaProductRepository } from "../../infra/repository/product-repository/prisma-product-repository";

const productGateway = new PrismaProductRepository
const productController = new ProductController(productGateway)

export const productRoutes = () => {

    const routerProduct = Router();

    routerProduct.post("/products/", productController.createProduct.bind(productController));
    routerProduct.get("/products/", productController.listProducts.bind(productController));
    routerProduct.get("/products/:id", productController.getProductById.bind(productController));
    routerProduct.put("/products/:id", productController.updateProduct.bind(productController));
    routerProduct.delete("/products/:id", productController.deleteProduct.bind(productController));


    return routerProduct;
}