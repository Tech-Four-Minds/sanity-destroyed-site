import { ProductProps } from "../../domain/entity/products";
import { ProductGateway } from "../../domain/gateway/products.gateway";
import { BaseUsecase } from "../usecase";

type UpdateProductInput = Partial<Omit<ProductProps, "id">>;

export class UpdateProductUseCase extends BaseUsecase<{ id: string; data: UpdateProductInput }, ProductProps> {
    constructor(private productGateway: ProductGateway) {
        super();
    }

    async execute(input: { id: string; data: UpdateProductInput }): Promise<ProductProps> {
        this.validateInput(input);

        try {
            const updatedProduct = await this.productGateway.updateProduct(input.id, input.data);
            this.logAction(`Produto ${input.id} atualizado com sucesso.`);
            return updatedProduct;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro ao atualizar produto."));
            }
            throw new Error("Atualização falhou.");
        }
    }

    validateInput(input: { id: string; data: UpdateProductInput }): void {
        if (!input.id) {
            throw new Error("O ID do produto é obrigatório.");
        }

        if (!input.data || Object.keys(input.data).length === 0) {
            throw new Error("Dados de atualização são obrigatórios.");
        }
    }
}
