import { ProductProps } from "../../domain/entity/products";
import { ProductGateway } from "../../domain/gateway/products.gateway";
import { BaseUsecase } from "../usecase";

export class ListProductsUseCase extends BaseUsecase<null, ProductProps[]> {
    constructor(private productGateway: ProductGateway) {
        super();
    }

    async execute(): Promise<ProductProps[]> {
        try {
            const products = await this.productGateway.listProducts();
            this.logAction("Produtos listados com sucesso");
            return products;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro ao listar produtos."));
            }
            throw error;
        }
    }
}
