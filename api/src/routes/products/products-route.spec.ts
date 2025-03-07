import request from "supertest";
import { app, server } from "../../main"; 

describe("Testes de Integração - Rotas de Produtos", () => {
    let productId: string;

    afterAll(() => {
        jest.clearAllTimers();
        server.close();
    });

    it("Deve criar um produto com sucesso", async () => {
        const response = await request(app)
            .post("/api/products/")
            .send({
                name: "Produto Teste",
                price: 99.99,
                type: "Tipo A",
                size: "M",
                quantity: 100,
                image: "imagem_url"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        productId = response.body.id;  
    });

    it("Deve listar todos os produtos", async () => {
        const response = await request(app).get("/api/products/");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0); 
    });

    it("Deve buscar um produto por ID", async () => {
        const response = await request(app).get(`/api/products/${productId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", productId);
    });

    it("Deve retornar erro ao buscar um produto inexistente", async () => {
        const response = await request(app).get("/api/products/invalid-id");

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Produto não encontrado");
    });

    it("Deve atualizar um produto existente", async () => {
        const response = await request(app)
            .put(`/api/products/${productId}`)
            .send({ name: "Produto Atualizado", price: 120.00 });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Produto Atualizado");
        expect(response.body.price).toBe(120.00);
    });

    it("Deve retornar erro ao tentar atualizar um produto inexistente", async () => {
        const response = await request(app)
            .put("/api/products/invalid-id")
            .send({ name: "Produto Inexistente" });

        expect(response.status).toBe(400); 
    });
    
    it("Deve deletar um produto existente", async () => {
        const response = await request(app).delete(`/api/products/${productId}`);

        expect(response.status).toBe(204);
    });

    it("Deve retornar erro ao tentar deletar um produto inexistente", async () => {
        const response = await request(app).delete("/api/products/invalid-id");

        expect(response.status).toBe(400); 
    });
});
