import { PrismaClient } from "@prisma/client";
import { NewsProps } from "../../../domain/entity/news";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { News } from "../../../domain/entity/news"; 

const prisma = new PrismaClient();

export class PrismaNewRepository implements NewsGateway {
  async createNews(data: Omit<NewsProps, "IdNews">): Promise<NewsProps> {
    const { name, date, description, image } = data;

    const newNews = News.create(name, new Date(date), description, image);

    const createdNews = await prisma.new.create({
      data: {
        name: newNews.name,
        date: newNews.date instanceof Date ? new Date(newNews.date) : new Date(newNews.date),
        description: newNews.description,
        image: newNews.image || undefined, 
      },
    });

    return this.mapPrismaNews(createdNews);
  }

  async listNews(): Promise<NewsProps[]> {
    const news = await prisma.new.findMany();
    return news.map(this.mapPrismaNews);
  }

  async getNewsById(IdNews: string): Promise<NewsProps | null> {
    const news = await prisma.new.findUnique({
      where: { id: IdNews },
    });
    return news ? this.mapPrismaNews(news) : null;
  }

  async updateNews(IdNews: string, data: Partial<Omit<NewsProps, "IdNews">>): Promise<NewsProps> {
    const news = await prisma.new.findUnique({
      where: { id: IdNews },
    });

    if (!news) throw new Error("Notícia não encontrada");

    const updatedNews = News.create(
      data.name || news.name,
      data.date ? new Date(data.date) : news.date, 
      data.description || news.description,
      data.image as Buffer || news.image || undefined
    );

    const updatedPost = await prisma.new.update({
      where: { id: IdNews },
      data: {
        name: updatedNews.name,
        date: updatedNews.date,
        description: updatedNews.description,
        image: updatedNews.image || undefined, 
      },
    });

    return this.mapPrismaNews(updatedPost);
  }

  async deleteNews(IdNews: string): Promise<void> {
    await prisma.new.delete({
      where: { id: IdNews },
    });
  }

  private mapPrismaNews(news: any): NewsProps {
    return {
      ...news,
      image: news.image ?? undefined, 
    };
  }
}
