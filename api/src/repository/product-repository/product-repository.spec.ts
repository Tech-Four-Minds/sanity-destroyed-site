import { InMemoryProductRepository } from "./product-repository";
import { ProductProps } from "../../domain/entity/products";

describe("InMemoryProductRepository", () => {
  let repository: InMemoryProductRepository;

  beforeEach(() => {
    repository = new InMemoryProductRepository();
  });

  test("Deve criar um produto", async () => {
    const input: Omit<ProductProps, "id"> = {
      name: "Produto Teste",
      price: 100,
      type: "Eletrônico",
      size: "M",
      quantity: 10,
      image: "url-imagem",
    };

    const product = await repository.createProduct(input);

    console.log("Produto criado:", product);

    expect(product).toHaveProperty("id");
    expect(product.name).toBe(input.name);
    expect(product.price).toBe(input.price);
    expect(product.type).toBe(input.type);
    expect(product.size).toBe(input.size);
    expect(product.quantity).toBe(input.quantity);
    expect(product.image).toBe(input.image);
  });

  test("Deve listar todos os produtos", async () => {
    const product1 = await repository.createProduct({
      name: "Produto 1",
      price: 50,
      type: "Eletrônico",
      size: "P",
      quantity: 20,
      image: "url-imagem-1",
    });

    const product2 = await repository.createProduct({
      name: "Produto 2",
      price: 150,
      type: "Móvel",
      size: "G",
      quantity: 15,
      image: "url-imagem-2",
    });

    const products = await repository.listProducts();

    console.log("Lista de produtos:", products);

    expect(products).toHaveLength(2);
    expect(products).toContainEqual(expect.objectContaining({ id: product1.id }));
    expect(products).toContainEqual(expect.objectContaining({ id: product2.id }));
  });

  test("Deve buscar um produto pelo ID", async () => {
    const product = await repository.createProduct({
      name: "Produto Teste",
      price: 100,
      type: "Eletrônico",
      size: "M",
      quantity: 10,
      image: "url-imagem",
    });

    const foundProduct = await repository.getProductById(product.id);

    console.log("Produto encontrado:", foundProduct);

    expect(foundProduct).toBeTruthy();
    expect(foundProduct?.id).toBe(product.id);
  });

  test("Deve atualizar um produto", async () => {
    const product = await repository.createProduct({
      name: "Produto Original",
      price: 100,
      type: "Eletrônico",
      size: "M",
      quantity: 10,
      image: "url-imagem",
    });

    const updatedProduct = await repository.updateProduct(product.id, {
      name: "Produto Atualizado",
      price: 120,
      quantity: 5,
    });

    console.log("Produto atualizado:", updatedProduct);

    expect(updatedProduct.name).toBe("Produto Atualizado");
    expect(updatedProduct.price).toBe(120);
    expect(updatedProduct.quantity).toBe(5);
  });

  test("Deve deletar um produto", async () => {
    const product = await repository.createProduct({
      name: "Produto para Deletar",
      price: 50,
      type: "Eletrônico",
      size: "M",
      quantity: 10,
      image: "url-imagem",
    });

    await repository.deleteProduct(product.id);

    const foundProduct = await repository.getProductById(product.id);

    console.log("Produto após deleção:", foundProduct);

    expect(foundProduct).toBeNull();
  });

  test("Deve lançar erro ao tentar atualizar um produto inexistente", async () => {
    try {
      await repository.updateProduct("id_inexistente", { name: "Novo Produto" });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Erro ao tentar atualizar produto inexistente:", error.message);
        expect(error.message).toBe("Produto não encontrado.");
      }
    }
  });

  test("Deve lançar erro ao tentar deletar um produto inexistente", async () => {
    try {
      await repository.deleteProduct("id_inexistente");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Erro ao tentar deletar produto inexistente:", error.message);
        expect(error.message).toBe("Produto não encontrado.");
      }
    }
  });
});
