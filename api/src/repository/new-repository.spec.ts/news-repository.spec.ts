import { InMemoryNewsRepository } from "./news-repository";
import { NewsProps } from "../../domain/entity/news";

describe("InMemoryNewsRepository", () => {
  let repository: InMemoryNewsRepository;

  beforeEach(() => {
    repository = new InMemoryNewsRepository();
  });

  test("Deve criar uma notícia", async () => {
    const input: Omit<NewsProps, "IdNews"> = {
      name: "Notícia Teste",
      description: "Descrição da notícia",
      date: new Date("2025-07-20"),
    };

    const news = await repository.createNews(input);

    console.log("Notícia criada:", news);  // Log da notícia criada
    expect(news).toHaveProperty("IdNews");
    expect(news.name).toBe(input.name);
    expect(news.description).toBe(input.description);
    expect(news.date).toEqual(input.date);
  });

  test("Deve listar todas as notícias", async () => {
    const news1 = await repository.createNews({
      name: "Notícia 1",
      description: "Descrição da notícia 1",
      date: new Date("2025-07-15"),
    });

    const news2 = await repository.createNews({
      name: "Notícia 2",
      description: "Descrição da notícia 2",
      date: new Date("2025-07-20"),
    });

    const newsList = await repository.listNews();

    console.log("Lista de notícias:", newsList);  // Log da lista de notícias
    expect(newsList).toHaveLength(2);
    expect(newsList).toContainEqual(news1);
    expect(newsList).toContainEqual(news2);
  });

  test("Deve buscar uma notícia pelo ID", async () => {
    const news = await repository.createNews({
      name: "Notícia Teste",
      description: "Descrição da notícia",
      date: new Date("2025-07-20"),
    });

    const foundNews = await repository.getNewsById(news.IdNews);

    console.log("Notícia encontrada:", foundNews);  // Log da notícia encontrada
    expect(foundNews).toBeTruthy();
    expect(foundNews?.IdNews).toBe(news.IdNews);
  });

  test("Deve atualizar uma notícia", async () => {
    const news = await repository.createNews({
      name: "Notícia Original",
      description: "Descrição original",
      date: new Date("2025-07-20"),
    });

    const updatedNews = await repository.updateNews(news.IdNews, {
      name: "Notícia Atualizada",
      description: "Descrição atualizada",
    });

    console.log("Notícia atualizada:", updatedNews);  // Log da notícia atualizada
    expect(updatedNews.name).toBe("Notícia Atualizada");
    expect(updatedNews.description).toBe("Descrição atualizada");
  });

  test("Deve deletar uma notícia", async () => {
    const news = await repository.createNews({
      name: "Notícia para Deletar",
      description: "Descrição da notícia",
      date: new Date("2025-07-20"),
    });

    await repository.deleteNews(news.IdNews);

    const foundNews = await repository.getNewsById(news.IdNews);

    console.log("Notícia deletada:", foundNews);  // Log da notícia deletada
    expect(foundNews).toBeNull();
  });

  test("Deve lançar erro ao tentar atualizar uma notícia inexistente", async () => {
    try {
      await repository.updateNews("id_inexistente", { name: "Novo Nome" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Erro ao atualizar notícia inexistente:", error);  // Log do erro
        expect(error.message).toBe("Notícia não encontrada.");
      }
    }
  });

  test("Deve lançar erro ao tentar deletar uma notícia inexistente", async () => {
    try {
      await repository.deleteNews("id_inexistente");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Erro ao deletar notícia inexistente:", error);  // Log do erro
        expect(error.message).toBe("Notícia não encontrada.");
      }
    }
  });
});
