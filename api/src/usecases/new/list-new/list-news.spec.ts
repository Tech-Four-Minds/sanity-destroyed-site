import { ListNewsUseCase } from "./list-news-usecase";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { NewsProps } from "../../../domain/entity/news";

const mockNewsGateway: jest.Mocked<NewsGateway> = {
    listNews: jest.fn(),
    createNews: jest.fn(),
    getNewsById: jest.fn(),
    updateNews: jest.fn(),
    deleteNews: jest.fn(),
};

describe("ListNewsUseCase", () => {
    let listNewsUseCase: ListNewsUseCase;

    beforeEach(() => {
        listNewsUseCase = new ListNewsUseCase(mockNewsGateway);
    });

    it("should list news successfully", async () => {
        const mockNewsList: NewsProps[] = [
            { IdNews: "1", name: "News 1", date: new Date(), description: "Description 1" },
            { IdNews: "2", name: "News 2", date: new Date(), description: "Description 2" },
        ];

        mockNewsGateway.listNews.mockResolvedValue(mockNewsList);

        const result = await listNewsUseCase.execute();

        expect(result).toEqual(mockNewsList);
        expect(mockNewsGateway.listNews).toHaveBeenCalled();
    });

    it("should handle error and return an empty list if listing news fails", async () => {
        const errorMessage = "Database Error";

        mockNewsGateway.listNews.mockRejectedValueOnce(new Error(errorMessage));

        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

        const result = await listNewsUseCase.execute();

        expect(result).toEqual([]);

        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage); 

        
        errorSpy.mockRestore();
    });
});
