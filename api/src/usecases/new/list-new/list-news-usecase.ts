import { NewsProps } from "../../../domain/entity/news";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { BaseUsecase } from "../../usecase";

export class ListNewsUseCase extends BaseUsecase<void, NewsProps[]> {
    constructor(private newsGateway: NewsGateway) {
        super();
    }

    validateInput(): void {
    }

    async execute(): Promise<NewsProps[]> {
        this.validateInput();

        try {
            const newsList = await this.newsGateway.listNews();
            this.logAction("Todas as notícias listadas com sucesso.");
            return newsList;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao listar as notícias";

            this.handleError(new Error(errorMessage)); 
            return []; 
        }
    }

    handleError(error: Error): void {
        console.error("Erro ao processar a operação:", error.message); 
    }
}
