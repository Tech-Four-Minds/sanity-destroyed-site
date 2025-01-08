import { UpdateProductUseCase } from "./update-product.usecase";
import { ProductGateway } from "../../../domain/gateway/products.gateway";
import { ProductProps } from "../../../domain/entity/products";

const mockProductGateway: jest.Mocked<ProductGateway> = {
    createProduct: jest.fn(),
    listProducts: jest.fn(),
    getProductById: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
};

describe("UpdateProductUseCase", () => {
    let updateProductUseCase: UpdateProductUseCase;

    beforeEach(() => {
        updateProductUseCase = new UpdateProductUseCase(mockProductGateway);
    });

    it("should throw error if product ID is missing or data is empty", async () => {
        const input = { id: "", data: {} };

        
        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("O ID do produto é obrigatório.");
    });

    it("should update product successfully", async () => {
        const input = { id: "1", data: { name: "Updated Product", price: 15, type: "Tipo A", size: "M", quantity: 200 } };
        const mockUpdatedProduct: ProductProps = {
            id: "1",
            name: "Updated Product",
            price: 15,
            type: "Tipo A",
            size: "M",
            quantity: 200,
        };

        mockProductGateway.updateProduct.mockResolvedValue(mockUpdatedProduct);

        const result = await updateProductUseCase.execute(input);

        expect(result).toEqual(mockUpdatedProduct);
        expect(mockProductGateway.updateProduct).toHaveBeenCalledWith(input.id, input.data);
    });

    it("should log action when product is updated successfully", async () => {
        const input = { id: "1", data: { name: "Updated Product", price: 15, type: "Tipo A", size: "M", quantity: 200 } };
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {}); 

        const mockUpdatedProduct: ProductProps = {
            id: "1",
            name: "Updated Product",
            price: 15,
            type: "Tipo A",
            size: "M",
            quantity: 200,
        };

        mockProductGateway.updateProduct.mockResolvedValue(mockUpdatedProduct);

        await updateProductUseCase.execute(input);

        expect(logSpy).toHaveBeenCalledWith("Ação realizada: Produto 1 atualizado com sucesso.");

        logSpy.mockRestore();
    });

    it("should handle error and throw user-friendly message if update fails", async () => {
        const input = { id: "1", data: { name: "Updated Product", price: 15 } };
        const errorMessage = "Database Error";

        mockProductGateway.updateProduct.mockRejectedValue(new Error(errorMessage));
        const errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
        const handleErrorSpy = jest.spyOn(updateProductUseCase, "handleError");

      
        await expect(updateProductUseCase.execute(input))
            .rejects
            .toThrow("Operação falhou. Tente novamente mais tarde.");

        expect(errorSpy).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);
        expect(handleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
        expect(mockProductGateway.updateProduct).toHaveBeenCalledWith(input.id, input.data);

        errorSpy.mockRestore();
    });
});
