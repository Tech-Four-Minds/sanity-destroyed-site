import request from "supertest";
import { app, server } from "../../main";  

describe("Testes de Integração - Rotas de Notícias", () => {
    let newsId: string;

    afterAll(() => {
        jest.clearAllTimers();  
        server.close();  
    });

    beforeAll(async () => {
        const response = await request(app)
            .post("/api/news/post") 
            .send({
                name: "Notícia Teste",
                date: "2025-01-25",
                description: "Descrição da notícia de teste"
            });
        newsId = response.body.IdNews;  
    });

    it("Deve criar uma notícia com sucesso", async () => {
        const response = await request(app)
            .post("/api/news/post")
            .send({
                name: "Notícia Teste",
                date: "2025-01-25",
                description: "Descrição da notícia de teste"
            });
    
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("IdNews");  
        newsId = response.body.IdNews;  
    });

    it("Deve listar todas as notícias", async () => {
        const response = await request(app).get("/api/news/get");  
    
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });
    
    

    it("Deve buscar uma notícia por ID", async () => {
        const response = await request(app).get(`/api/news/${newsId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("IdNews", newsId);  
    });

    it("Deve retornar erro ao buscar uma notícia inexistente", async () => {
        const response = await request(app).get(`/api/news/invalid-id`);
    
        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Notícia não encontrado");  
    });
    

    it("Deve atualizar uma notícia existente", async () => {
        const response = await request(app)
            .put(`/api/news/${newsId}`)
            .send({ name: "Notícia Atualizada" });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Notícia Atualizada");
    });

    it("Deve retornar erro ao tentar atualizar uma notícia inexistente", async () => {
        const response = await request(app)
            .put(`/api/news/invalid-id`)
            .send({ name: "Notícia Inexistente" });

        expect(response.status).toBe(400);
    });

    it("Deve deletar uma notícia existente", async () => {
        const response = await request(app).delete(`/api/news/${newsId}`);

        expect(response.status).toBe(204);
    });

    it("Deve retornar erro ao tentar deletar uma notícia inexistente", async () => {
        const response = await request(app).delete(`/api/news/invalid-id`);

        expect(response.status).toBe(400);
    });
});
