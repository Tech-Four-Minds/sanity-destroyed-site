import { NewsProps } from "../../../domain/entity/news";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { BaseUsecase } from "../../usecase";

type UpdateNewsInput = Partial<Omit<NewsProps, "IdNews">>;

export class UpdateNewsUsecase extends BaseUsecase<{ id: string; data: UpdateNewsInput }, NewsProps> {
    constructor(private newsGateway: NewsGateway) {
        super();
    }

    async execute(input: { id: string; data: UpdateNewsInput }): Promise<NewsProps> {
        this.validateInput(input);

        try {
            const updatedNews = await this.newsGateway.updateNews(input.id, input.data);
            this.logAction(`Notícia ${input.id} atualizada com sucesso.`);
            return updatedNews;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Erro ao atualizar notícia."));
            }
            throw new Error("Atualização falhou.");
        }
    }

    validateInput(input: { id: string; data: UpdateNewsInput }): void {
        if (!input.id) {
            throw new Error("ID é obrigatório.");
        }
        if (!input.data || Object.keys(input.data).length === 0) {
            throw new Error("Dados da atualização são obrigatórios.");
        }
    }

    handleError(error: Error): void {
        console.error("Erro ao processar a operação:", error.message);
        throw new Error("Atualização falhou.");
    }
}
