import { Product, ProductProps } from "../../../domain/entity/products";
import { ProductGateway } from "../../../domain/gateway/products.gateway";

export class InMemoryProductRepository implements ProductGateway {
  private products: Product[] = [];

  public async createProduct(data: Omit<ProductProps, "id">): Promise<ProductProps> {
    const product = Product.create(data.name, data.price, data.type, data.size, data.quantity, data.image);
    this.products.push(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      size: product.size,
      quantity: product.quantity,
      image: product.image, 
    };
  }

  public async listProducts(): Promise<ProductProps[]> {
    return this.products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      size: product.size,
      quantity: product.quantity,
      image: product.image, 
    }));
  }

  public async getProductById(id: string): Promise<ProductProps | null> {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      return null;
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      size: product.size,
      quantity: product.quantity,
      image: product.image, 
    };
  }

  public async updateProduct(id: string, data: Partial<Omit<ProductProps, "id">>): Promise<ProductProps> {
    const product = this.products.find(product => product.id === id);  
    if (!product) throw new Error("Produto não encontrado.");

    if (data.name) product.name = data.name;
    if (data.price) product.price = data.price;
    if (data.type) product.type = data.type;
    if (data.size) product.size = data.size;
    if (data.quantity) product.quantity = data.quantity;
    if (data.image) product.image = data.image;

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      type: product.type,
      size: product.size,
      quantity: product.quantity,
      image: product.image,
    };
}

  public async deleteProduct(id: string): Promise<void> {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) throw new Error("Produto não encontrado.");

    this.products.splice(index, 1);
  }
}
