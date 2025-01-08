import { NewsProps } from "../../../domain/entity/news";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { BaseUsecase } from "../../usecase";

export class GetNewsByIdUseCase extends BaseUsecase<string, NewsProps | null> {
    constructor(private newsGateway: NewsGateway) {
        super();
    }

    validateInput(id: string): void {
        if (!id) {
            throw new Error("Entrada inválida");
        }
    }

    async execute(id: string): Promise<NewsProps | null> {
        this.validateInput(id);

        try {
            const news = await this.newsGateway.getNewsById(id);
            this.logAction(`Ação realizada: Notícia ${id} buscada com sucesso.`);
            return news;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Erro ao buscar a notícia";

            this.handleError(new Error(`Erro ao processar a operação: ${errorMessage}`));
            return null;
        }
    }

    logAction(action: string): void {
        console.log(action);
    }


    handleError(error: Error): void {
        console.error("Erro ao processar a operação:", error.message);
        throw new Error("Operação falhou. Tente novamente mais tarde.");
    }
}
