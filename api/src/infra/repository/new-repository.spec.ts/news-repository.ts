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

 
  public async updateNews(IdNews: string, data: Partial<Omit<NewsProps, "IdNews">>): Promise<NewsProps> {
    const newsIndex = this.news.findIndex(news => news.IdNews === IdNews);
    if (newsIndex === -1) throw new Error("Notícia não encontrada.");

    const updatedNews = News.create(
      data.name ?? this.news[newsIndex].name,    
      data.date ?? this.news[newsIndex].date,    
      data.description ?? this.news[newsIndex].description    
    );

    this.news[newsIndex] = updatedNews;  
    return {
      IdNews: updatedNews.IdNews,  
      name: updatedNews.name,     
      description: updatedNews.description,  
      date: updatedNews.date,      
    };  
  }

  public async deleteNews(IdNews: string): Promise<void> {
    const newsIndex = this.news.findIndex(news => news.IdNews === IdNews);
    if (newsIndex === -1) throw new Error("Notícia não encontrada.");

    this.news.splice(newsIndex, 1);  
  }
}
