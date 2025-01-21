import request from "supertest";
import { app, server} from "../../main";  

describe("Testes de Integração - Rotas de Eventos", () => {
    let eventId: string;

    afterAll(() => {
        jest.clearAllTimers();  
        server.close();
    });

    it("Deve criar um evento com sucesso", async () => {
        const response = await request(app)  
            .post("/api/events/post")
            .send({
                name: "Evento Teste",
                location: "Local Teste",
                date: "2025-01-25",
                schedule: "10:00",
                price: 100,
                ticket: 50,
                status: "ativo",
                image: "url-da-imagem"
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        eventId = response.body.id;
    });

    it("Deve listar todos os eventos", async () => {
        const response = await request(app).get("/api/events/get");

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("Deve buscar um evento por ID", async () => {
        const response = await request(app).get(`/api/events/${eventId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", eventId);
    });

    it("Deve retornar erro ao buscar um evento inexistente", async () => {
        const response = await request(app).get(`/api/events/invalid-id`);

        expect(response.status).toBe(404);
        expect(response.body.error).toBe("Evento não encontrado");
    });

    it("Deve atualizar um evento existente", async () => {
        const response = await request(app)
            .put(`/api/events/${eventId}`)
            .send({ name: "Evento Atualizado" });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Evento Atualizado");
    });

    it("Deve retornar erro ao tentar atualizar um evento inexistente", async () => {
        const response = await request(app)
            .put(`/api/events/invalid-id`)
            .send({ name: "Evento Inexistente" });

        expect(response.status).toBe(400);
    });

    it("Deve deletar um evento existente", async () => {
        const response = await request(app).delete(`/api/events/${eventId}`);

        expect(response.status).toBe(204);
    });

    it("Deve retornar erro ao tentar deletar um evento inexistente", async () => {
        const response = await request(app).delete(`/api/events/invalid-id`);

        expect(response.status).toBe(400);
    });
});
