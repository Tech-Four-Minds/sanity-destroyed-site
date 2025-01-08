import { ProductGateway } from "../../../domain/gateway/products.gateway";
import { DeleteProductUseCase } from "./delete-product.usecase";

const mockProductGateway = {
  createProduct: jest.fn(),
  listProducts: jest.fn(),
  getProductById: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
} as jest.Mocked<ProductGateway>;


mockProductGateway.deleteProduct.mockResolvedValueOnce(undefined); 

describe('DeleteProductUseCase', () => {
  let deleteProductUseCase: DeleteProductUseCase;

  beforeEach(() => {
    deleteProductUseCase = new DeleteProductUseCase(mockProductGateway);
  });

  it('should delete a product successfully', async () => {
    const productId = '123';

 
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    await deleteProductUseCase.execute(productId);

    expect(mockProductGateway.deleteProduct).toHaveBeenCalledWith(productId);
    expect(mockProductGateway.deleteProduct).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(`Ação realizada: Produto ${productId} deletado com sucesso.`);

    logSpy.mockRestore(); 
  });

  it('should handle errors when deleting a product', async () => {
    const productId = '123';
    const errorMessage = 'Database Error';

    mockProductGateway.deleteProduct.mockRejectedValueOnce(new Error(errorMessage));

   
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(deleteProductUseCase.execute(productId)).rejects.toThrow("Operação falhou. Tente novamente mais tarde.");

    expect(console.error).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);
    expect(console.error).toHaveBeenCalledTimes(1);

    errorSpy.mockRestore(); 
  });
});
