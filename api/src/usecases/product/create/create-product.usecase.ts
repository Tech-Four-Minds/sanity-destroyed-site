import { ProductGateway } from "../../../domain/gateway/products.gateway";
import { BaseUsecase } from "../../usecase";
import { ProductProps } from "../../../domain/entity/products";

export class CreateProductUseCase extends BaseUsecase<any, ProductProps> {
    constructor(private productGateway: ProductGateway) {
        super();
    }

    async execute(input: any): Promise<ProductProps> {
        this.validateInput(input);

        const { name, price, type, size, quantity, image } = input;

        if (!name) throw new Error("O nome do produto é obrigatório.");
        if (price < 0) throw new Error("O preço do produto não pode ser negativo.");
        if (!type) throw new Error("O tipo do produto é obrigatório.");
        if (!size) throw new Error("O tamanho do produto é obrigatório.");
        if (quantity < 0) throw new Error("A quantidade do produto não pode ser negativa.");

        try {
            const product = await this.productGateway.createProduct({
                name,
                price,
                type,
                size,
                quantity,
                image
            });
            this.logAction(`Produto ${product.id} criado com sucesso.`);
            return product;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro desconhecido ao criar produto."));
            }
            throw new Error("Falha ao criar produto.");
        }
    }
}