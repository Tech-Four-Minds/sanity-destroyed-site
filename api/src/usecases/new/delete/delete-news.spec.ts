import { DeleteNewsUseCase } from "./delete-news.useca";
import { NewsGateway } from "../../../domain/gateway/news.gateway";

const mockNewsGateway = {
    getNewsById: jest.fn(),
    deleteNews: jest.fn(),
    createNews: jest.fn(),
    listNews: jest.fn(),
    updateNews: jest.fn(),
} as jest.Mocked<NewsGateway>;

mockNewsGateway.deleteNews.mockResolvedValueOnce(undefined); 

describe("DeleteNewsUseCase", () => {
    let deleteNewsUseCase: DeleteNewsUseCase;

    beforeEach(() => {
        deleteNewsUseCase = new DeleteNewsUseCase(mockNewsGateway);
    });

    it("should delete a news successfully", async () => {
        const newsId = "123";

        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        mockNewsGateway.getNewsById.mockResolvedValueOnce({ IdNews: "123", name: "News Title", date: new Date(), description: "Description" });

        await deleteNewsUseCase.execute(newsId);

        expect(mockNewsGateway.deleteNews).toHaveBeenCalledWith(newsId);
        expect(mockNewsGateway.deleteNews).toHaveBeenCalledTimes(1);

        expect(logSpy).toHaveBeenCalledWith(`Ação realizada: Notícia ${newsId} excluída com sucesso.`);

        logSpy.mockRestore(); 
    });

    it("should handle errors when deleting a news", async () => {
        const newsId = "123";
        const errorMessage = "Database Error";
    
        mockNewsGateway.getNewsById.mockResolvedValueOnce({ IdNews: "123", name: "News Title", date: new Date(), description: "Description" });
        mockNewsGateway.deleteNews.mockRejectedValueOnce(new Error(errorMessage));
    
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
        await expect(deleteNewsUseCase.execute(newsId)).rejects.toThrow("Operação falhou. Tente novamente mais tarde.");
    
        
        expect(console.error).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);
        expect(console.error).toHaveBeenCalledTimes(1);
    
        errorSpy.mockRestore(); 
    });
    
});
