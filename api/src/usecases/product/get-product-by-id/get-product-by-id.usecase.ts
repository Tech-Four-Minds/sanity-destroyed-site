import { ProductProps } from "../../../domain/entity/products";
import { ProductGateway } from "../../../domain/gateway/products.gateway";
import { BaseUsecase } from "../../usecase";

export class GetProductByIdUseCase extends BaseUsecase<string, ProductProps | null> {
    constructor(private productGateway: ProductGateway) {
        super();
    }

    async execute(id: string): Promise<ProductProps | null> {
        this.validateInput(id);

        try {
            const product = await this.productGateway.getProductById(id);
            this.logAction(`Produto ${id} buscado com sucesso`);
            return product;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro ao buscar o produto"));
            }
            return null;
        }
    }
}