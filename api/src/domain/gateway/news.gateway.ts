import { NewsProps } from "../entity/news";

export interface NewsGateway {
    createNews(data: Omit<NewsProps, "IdNews">): Promise<NewsProps>;
    listNews(): Promise<NewsProps[]>;
    getNewsById(IdNews: string): Promise<NewsProps | null>;
    updateNews(IdNews: string, data: Partial<Omit<NewsProps, "IdNews">>): Promise<NewsProps>;
    deleteNews(IdNews: string): Promise<void>;
}
