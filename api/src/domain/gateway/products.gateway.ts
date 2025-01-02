import { ProductProps } from "../entity/products";


export interface ProductGateway {
    createProduct(data: Omit<ProductProps, "id">): Promise<ProductProps>;
    listProducts(): Promise<ProductProps[]>;
    getProductById(id: string): Promise<ProductProps | null>;
    updateProduct(id: string, data: Partial<Omit<ProductProps, "id">>): Promise<ProductProps>;
    deleteProduct(id: string): Promise<void>;
}