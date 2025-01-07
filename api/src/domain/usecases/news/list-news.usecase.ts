import { NewsGateway } from "../../gateway/news.gateway";
import { Usecase } from "../usecase";
import { News } from "../../entity/news";

export type ListNewsInputDto = void;

export type ListNewsOutputDto = {
    news: {
        id: string;
        name: string;
        date: string;
        description: string;
    }[];
};

export class ListNewsUsecase implements Usecase<ListNewsInputDto, ListNewsOutputDto> {
    private constructor(private readonly newsGateway: NewsGateway) {}

    public static create(newsGateway: NewsGateway) {
        return new ListNewsUsecase(newsGateway);
    }

    public async execute(input: ListNewsInputDto): Promise<ListNewsOutputDto> {
        
        const news = await this.newsGateway.list();

     
        const output = this.presentOutput(news);

        return output;
    }

    private presentOutput(news: News[]): ListNewsOutputDto {
        return {
            news: news.map((p) => ({
                id: p.IdNews,
                name: p.name,
                date: p.date.toISOString(),
                description: p.description,
            })),
        };
    }
}
