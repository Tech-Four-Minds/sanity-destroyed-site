import { CreateNewsUseCase } from "./create-news.usecase";
import { NewsGateway } from "../../../domain/gateway/news.gateway";
import { NewsProps } from "../../../domain/entity/news";

const mockNewsGateway: jest.Mocked<NewsGateway> = {
    createNews: jest.fn(),
    listNews: jest.fn(),
    getNewsById: jest.fn(),
    updateNews: jest.fn(),
    deleteNews: jest.fn(),
};

describe("CreateNewsUseCase", () => {
    let createNewsUseCase: CreateNewsUseCase;

    beforeEach(() => {
        createNewsUseCase = new CreateNewsUseCase(mockNewsGateway);
    });

    it("should log action when news is created successfully", async () => {
        const validDate = new Date(Date.now() + 10000); 
        const mockNews: NewsProps = {
            IdNews: "1",
            name: "New News",
            description: "Description of the news",
            date: validDate,
        };

        mockNewsGateway.createNews.mockResolvedValue(mockNews);

        const result = await createNewsUseCase.execute({
            name: "New News",
            date: validDate,
            description: "Description of the news",
        });

    
        expect(result).toEqual(mockNews);

        
        expect(mockNewsGateway.createNews).toHaveBeenCalledWith({
            name: "New News",
            date: validDate,
            description: "Description of the news",
        });
    });

    it("should throw an error if the date is in the past", async () => {
        const pastDate = new Date(Date.now() - 10000); 

        await expect(createNewsUseCase.execute({
            name: "New News",
            date: pastDate,
            description: "Description of the news",
        })).rejects.toThrow("A data da notícia não pode ser no passado.");
    });

    it("should throw an error if any required field is missing", async () => {
        await expect(createNewsUseCase.execute({
            name: "",
            date: new Date(Date.now() + 10000),
            description: "Description of the news",
        })).rejects.toThrow("O título da notícia é obrigatório.");

        await expect(createNewsUseCase.execute({
            name: "New News",
            date: null,
            description: "Description of the news",
        })).rejects.toThrow("A data da notícia é obrigatória.");

        await expect(createNewsUseCase.execute({
            name: "New News",
            date: new Date(Date.now() + 10000),
            description: "",
        })).rejects.toThrow("A descrição da notícia é obrigatória.");
    });
});
