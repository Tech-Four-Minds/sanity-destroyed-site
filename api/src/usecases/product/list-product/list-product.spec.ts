import { ProductGateway } from "../../../domain/gateway/products.gateway";
import { ListProductsUseCase } from "./list-product.usecase";
import { ProductProps } from "../../../domain/entity/products";

const mockProductGateway = {
  createProduct: jest.fn(),
  listProducts: jest.fn(),
  getProductById: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
} as jest.Mocked<ProductGateway>;

describe('ListProductsUseCase', () => {
  let listProductsUseCase: ListProductsUseCase;

  beforeEach(() => {
    listProductsUseCase = new ListProductsUseCase(mockProductGateway);
  });

  it('should list products successfully', async () => {
    const mockProducts: ProductProps[] = [
      {
        id: "1",
        name: "Produto 1",
        price: 10,
        type: "Tipo A",
        size: "M",
        quantity: 100
      },
      {
        id: "2",
        name: "Produto 2",
        price: 20,
        type: "Tipo B",
        size: "P",
        quantity: 50
      }
    ];

    mockProductGateway.listProducts.mockResolvedValueOnce(mockProducts);

    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const result = await listProductsUseCase.execute();

    expect(mockProductGateway.listProducts).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockProducts);
    
    expect(logSpy).toHaveBeenCalledWith("Ação realizada: Produtos listados com sucesso");

    logSpy.mockRestore(); 
  });

  it('should handle errors when listing products', async () => {
    const errorMessage = 'Database Error';

    mockProductGateway.listProducts.mockRejectedValueOnce(new Error(errorMessage));

    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    try {
      await listProductsUseCase.execute();
    } catch (error) {
      expect(console.error).toHaveBeenCalledWith("Erro ao processar a operação:", errorMessage);
      expect(console.error).toHaveBeenCalledTimes(1);
    }

    errorSpy.mockRestore(); 
  });
});
