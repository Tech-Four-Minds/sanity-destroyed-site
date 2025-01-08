import { GetNewsByIdUseCase } from "./get-news-by-id.usecase";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { NewsProps } from "../../../domain/entity/news";

const mockNewsGateway: jest.Mocked<NewsGateway> = {
    createNews: jest.fn(),
    listNews: jest.fn(),
    getNewsById: jest.fn(),
    updateNews: jest.fn(),
    deleteNews: jest.fn(),
};

describe("GetNewsByIdUseCase", () => {
    let getNewsByIdUseCase: GetNewsByIdUseCase;

    beforeEach(() => {
        getNewsByIdUseCase = new GetNewsByIdUseCase(mockNewsGateway);
    });

    it("should throw error if id is missing", async () => {
        const newsId = "";

        await expect(getNewsByIdUseCase.execute(newsId))
            .rejects
            .toThrow("Entrada inválida");
    });

    it("should fetch news successfully", async () => {
        const newsId = "123";
        const mockNews: NewsProps = {
            IdNews: newsId,
            name: "News Title",
            date: new Date(),
            description: "Description",
        };

        mockNewsGateway.getNewsById.mockResolvedValueOnce(mockNews);

        const result = await getNewsByIdUseCase.execute(newsId);

        expect(result).toEqual(mockNews);
        expect(mockNewsGateway.getNewsById).toHaveBeenCalledWith(newsId);
    });

    it("should log action when news is fetched successfully", async () => {
        const newsId = "123";
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        const mockNews: NewsProps = {
            IdNews: newsId,
            name: "News Title",
            date: new Date(),
            description: "Description",
        };

        mockNewsGateway.getNewsById.mockResolvedValueOnce(mockNews);

        await getNewsByIdUseCase.execute(newsId);

        expect(logSpy).toHaveBeenCalledWith(`Ação realizada: Notícia ${newsId} buscada com sucesso.`);

        logSpy.mockRestore();
    });

    it("should handle error and return null if fetching news fails", async () => {
        const newsId = "123";
        const errorMessage = "Database Error";
    
        mockNewsGateway.getNewsById.mockRejectedValueOnce(new Error(errorMessage));
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
        await expect(getNewsByIdUseCase.execute(newsId))
            .rejects
            .toThrow("Operação falhou. Tente novamente mais tarde.");
    
        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", `Erro ao processar a operação: ${errorMessage}`);
    
        errorSpy.mockRestore();
    });
    
});
