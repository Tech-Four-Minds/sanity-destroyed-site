import { ProductGateway } from "../../domain/gateway/products.gateway";
import { BaseUsecase } from "../usecase";

export class DeleteProductUseCase extends BaseUsecase<string, void> {
    constructor(private productGateway: ProductGateway) {
        super();
    }

    async execute(id: string): Promise<void> {
        this.validateInput(id);

        try {
            await this.productGateway.deleteProduct(id);
            this.logAction(`Produto ${id} deletado com sucesso.`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro desconhecido ao deletar produto."));
            }
        }
    }
}
