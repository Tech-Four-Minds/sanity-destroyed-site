import { News } from "../../entity/news";
import { NewsGateway } from "../../gateway/news.gateway";
import { Usecase } from "../usecase";

export type CreateNewsInputDto = {
    name: string;
    date: string;
    description: string;
};

export type CreateNewsOutputDto = {
    id: string;
};

export class CreateNewsUseCase implements Usecase<CreateNewsInputDto, CreateNewsOutputDto> {
    private constructor(private readonly newsGateway: NewsGateway) {}

    public static create(newsGateway: NewsGateway) {
        return new CreateNewsUseCase(newsGateway);
    }

    public async execute({ name, date, description }: CreateNewsInputDto): Promise<CreateNewsOutputDto> {
        
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error("Invalid date format.");
        }

        
        const aNews = News.create(name, parsedDate, description);

        
        await this.newsGateway.save(aNews);

     
        return {
            id: aNews.IdNews, 
        };
    }
}
