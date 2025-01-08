import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { BaseUsecase } from "../../usecase";

export class DeleteNewsUseCase extends BaseUsecase<string, void> {
    constructor(private newsGateway: NewsGateway) {
        super();
    }

    async execute(newsId: string): Promise<void> {
        this.validateInput(newsId);

        try {

            const news = await this.newsGateway.getNewsById(newsId);
            if (!news) {
                throw new Error("Notícia não encontrada.");
            }


            await this.newsGateway.deleteNews(newsId);


            this.logAction(`Notícia ${newsId} excluída com sucesso.`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);  
            } else {
                this.handleError(new Error("Falha ao excluir notícia."));  
            }
        }
    }
}
