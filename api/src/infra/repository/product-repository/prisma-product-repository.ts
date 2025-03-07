import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domain/gateway/products.gateway";
import { ProductProps } from "../../../domain/entity/products";
import { Product } from "../../../domain/entity/products";

const prisma = new PrismaClient();

export class PrismaProductRepository implements ProductGateway {
  async createProduct(data: Omit<ProductProps, "id">): Promise<ProductProps> {
    const product = Product.create(
      data.name,
      data.price,
      data.type,
      data.size,
      data.quantity,
      data.image
    );

    const createdProduct = await prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        type: product.type,
        size: product.size,
        quantity: product.quantity,
        image: product.image || undefined,  
      },
    });

    return this.mapPrismaProduct(createdProduct);
  }

  async listProducts(): Promise<ProductProps[]> {
    const products = await prisma.product.findMany();
    return products.map(this.mapPrismaProduct);
  }

  async getProductById(id: string): Promise<ProductProps | null> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) return null;

    return this.mapPrismaProduct(product);
  }

  async updateProduct(id: string, data: Partial<Omit<ProductProps, "id">>): Promise<ProductProps> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) throw new Error("Produto não encontrado");

    const updatedProduct = Product.with({
        id: product.id,
        name: data.name || product.name,
        price: data.price || product.price,
        type: data.type || product.type,
        size: data.size || product.size,
        quantity: data.quantity || product.quantity,
        image: (data.image as Buffer) || product.image || undefined,

      });
      

    const productUpdated = await prisma.product.update({
      where: { id },
      data: {
        name: updatedProduct.name,
        price: updatedProduct.price,
        type: updatedProduct.type,
        size: updatedProduct.size,
        quantity: updatedProduct.quantity,
        image: updatedProduct.image ?? undefined,  
      },
    });

    return this.mapPrismaProduct(productUpdated);
  }

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }

  private mapPrismaProduct(product: any): ProductProps {
    return {
      ...product,
      image: product.image ?? undefined,  
    };
  }

}
