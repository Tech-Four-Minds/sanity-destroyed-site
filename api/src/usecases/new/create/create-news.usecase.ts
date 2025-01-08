import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { BaseUsecase } from "../../usecase";
import { NewsProps } from "../../../domain/entity/news";

export class CreateNewsUseCase extends BaseUsecase<any, NewsProps> {
    constructor(private newsGateway: NewsGateway) {
        super();
    }

    async execute(input: any): Promise<NewsProps> {
        this.validateInput(input);

        const { name, date, description } = input;

        if (!name) throw new Error("O título da notícia é obrigatório.");
        if (!description) throw new Error("A descrição da notícia é obrigatória.");
        if (!date) throw new Error("A data da notícia é obrigatória.");
        if (date < new Date()) throw new Error("A data da notícia não pode ser no passado.");

        try {
            const news = await this.newsGateway.createNews({
                name,
                date,
                description,
            });

            this.logAction(`Notícia ${news.IdNews} criada com sucesso.`);
            return news;
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.handleError(error);
            } else {
                this.handleError(new Error("Falha ao criar notícia."));
            }
            throw new Error("Falha ao criar notícia.");
        }
    }
}
