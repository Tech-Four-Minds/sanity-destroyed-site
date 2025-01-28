import { PrismaClient } from "@prisma/client";
import { NewsProps } from "../../../domain/entity/news";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { News } from "../../../domain/entity/news"; 

const prisma = new PrismaClient();

export class PrismaNewRepository implements NewsGateway {
  async createNews(data: Omit<NewsProps, "IdNews">): Promise<NewsProps> {
    const { name, date, description } = data;

    const newNews = News.create(name, new Date(date), description);

    const createdNews = await prisma.new.create({
      data: {
        name: newNews.name,
        date: newNews.date,
        description: newNews.description,
      },
    });

    return createdNews;
  }

  async listNews(): Promise<NewsProps[]> {
    const news = await prisma.new.findMany();
    return news;
  }

  async getNewsById(IdNews: string): Promise<NewsProps | null> {
    const news = await prisma.new.findUnique({
      where: { id: IdNews },
    });
    return news ? news : null;
  }

  async updateNews(IdNews: string, data: Partial<Omit<NewsProps, "IdNews">>): Promise<NewsProps> {
    const { name, date, description } = data;

    const updatedNews = News.create(
      name || "", 
      date ? new Date(date) : new Date(),
      description || "", 
      IdNews
    );

    const updatedPost = await prisma.new.update({
      where: { id: IdNews },
      data: {
        name: updatedNews.name,
        date: updatedNews.date,
        description: updatedNews.description,
      },
    });

    return updatedPost;
  }

  async deleteNews(IdNews: string): Promise<void> {
    await prisma.new.delete({
      where: { id: IdNews },
    });
  }
}
