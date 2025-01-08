import { CreateProductUseCase } from "./create-product.usecase";
import { ProductGateway } from "../../../domain/gateway/products.gateway";
import { ProductProps } from "../../../domain/entity/products";

const mockProductGateway: jest.Mocked<ProductGateway> = {
    createProduct: jest.fn(),
    listProducts: jest.fn(),
    getProductById: jest.fn(), 
    updateProduct: jest.fn(), 
    deleteProduct: jest.fn(), 
};

describe("CreateProductUseCase", () => {
    let createProductUseCase: CreateProductUseCase;

    beforeEach(() => {
        createProductUseCase = new CreateProductUseCase(mockProductGateway);
    });

    it("should throw error if product name is missing", async () => {
        const input = { name: "", price: 10, type: "type", size: "M", quantity: 5, image: "image.jpg" };
        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("O nome do produto é obrigatório.");
    });

    it("should throw error if product price is negative", async () => {
        const input = { name: "Product", price: -10, type: "type", size: "M", quantity: 5, image: "image.jpg" };
        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("O preço do produto não pode ser negativo.");
    });

    it("should throw error if product type is missing", async () => {
        const input = { name: "Product", price: 10, type: "", size: "M", quantity: 5, image: "image.jpg" };
        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("O tipo do produto é obrigatório.");
    });

    it("should throw error if product size is missing", async () => {
        const input = { name: "Product", price: 10, type: "type", size: "", quantity: 5, image: "image.jpg" };
        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("O tamanho do produto é obrigatório.");
    });

    it("should throw error if product quantity is negative", async () => {
        const input = { name: "Product", price: 10, type: "type", size: "M", quantity: -5, image: "image.jpg" };
        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("A quantidade do produto não pode ser negativa.");
    });

    it("should create product successfully", async () => {
        const input = { name: "Product", price: 10, type: "type", size: "M", quantity: 5, image: "image.jpg" };
        const mockProduct: ProductProps = { id: "1", ...input };
        mockProductGateway.createProduct.mockResolvedValue(mockProduct);

        const result = await createProductUseCase.execute(input);

        expect(result).toEqual(mockProduct);
        expect(mockProductGateway.createProduct).toHaveBeenCalledWith(input);
    });

    it("should log action and handle error if product creation fails", async () => {
        const input = { name: "Product", price: 10, type: "type", size: "M", quantity: 5, image: "image.jpg" };
        mockProductGateway.createProduct.mockRejectedValue(new Error("Database Error"));
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
        await expect(createProductUseCase.execute(input))
            .rejects
            .toThrow("Operação falhou. Tente novamente mais tarde.");
    
        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", "Database Error");
    });
    
    
});
