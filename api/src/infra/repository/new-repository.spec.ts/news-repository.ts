import { NewsGateway } from "../../../domain/gateway/news.gateway"; 
import { News, NewsProps } from "../../../domain/entity/news";  

export class InMemoryNewsRepository implements NewsGateway {
  private news: News[] = [];  

  public async createNews(data: Omit<NewsProps, "IdNews">): Promise<NewsProps> {
    const news = News.create(data.name, data.date, data.description);  
    this.news.push(news);  
    return {
      IdNews: news.IdNews,  
      name: news.name,      
      description: news.description,  
      date: news.date,       
    }; 
  }

  public async listNews(): Promise<NewsProps[]> {
    return this.news.map(news => ({
      IdNews: news.IdNews,  
      name: news.name,     
      description: news.description,  
      date: news.date,      
    }));
  }

  public async getNewsById(IdNews: string): Promise<NewsProps | null> {
    const news = this.news.find(news => news.IdNews === IdNews);
    return news ? {
      IdNews: news.IdNews,  
      name: news.name,     
      description: news.description,  
      date: news.date,     
    } : null;
  }

 
  public async updateNews(id: string, data: Partial<Omit<NewsProps, "IdNews">>): Promise<NewsProps> {
    const news = this.news.find(n => n.IdNews === id);
    if (!news) throw new Error("Notícia não encontrada.");

    if (data.name) news.name = data.name;
    if (data.date) news.date = new Date(data.date); 
    if (data.description) news.description = data.description;


    return {
        IdNews: news.IdNews,
        name: news.name,
        date: news.date, 
        description: news.description,
    };
}

  public async deleteNews(IdNews: string): Promise<void> {
    const newsIndex = this.news.findIndex(news => news.IdNews === IdNews);
    if (newsIndex === -1) throw new Error("Notícia não encontrada.");

    this.news.splice(newsIndex, 1);  
  }
}
