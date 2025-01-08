import { UpdateNewsUsecase } from "./update-news-usecase";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { NewsProps } from "../../../domain/entity/news";

const mockNewsGateway: jest.Mocked<NewsGateway> = {
    createNews: jest.fn(),
    listNews: jest.fn(),
    getNewsById: jest.fn(),
    updateNews: jest.fn(),
    deleteNews: jest.fn(),
};

describe("UpdateNewsUsecase", () => {
    let updateNewsUsecase: UpdateNewsUsecase;

    beforeEach(() => {
        updateNewsUsecase = new UpdateNewsUsecase(mockNewsGateway);
    });

    it("should successfully update news", async () => {
        const mockNews: NewsProps = {
            IdNews: "1",
            name: "Updated News",
            description: "Updated description",
            date: new Date(),
        };

        mockNewsGateway.updateNews.mockResolvedValue(mockNews);

        const result = await updateNewsUsecase.execute({ id: "1", data: { name: "Updated News", description: "Updated description" } });

        expect(result).toEqual(mockNews);
        expect(mockNewsGateway.updateNews).toHaveBeenCalledWith("1", {
            name: "Updated News",
            description: "Updated description",
        });
    });

    it("should throw an error if id or data is missing", async () => {
      
        await expect(updateNewsUsecase.execute({ id: "", data: { name: "Updated News" } }))
            .rejects
            .toThrow("ID é obrigatório.");

        
        await expect(updateNewsUsecase.execute({ id: "1", data: {} }))
            .rejects
            .toThrow("Dados da atualização são obrigatórios.");
    });

    it("should handle error and throw an exception when updating fails", async () => {
        const errorMessage = "Error updating the news";

        mockNewsGateway.updateNews.mockRejectedValueOnce(new Error(errorMessage));

        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        await expect(updateNewsUsecase.execute({ id: "1", data: { name: "Updated News", description: "Updated description" } }))
            .rejects
            .toThrow("Atualização falhou.");

        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);

        errorSpy.mockRestore();
    });
});
