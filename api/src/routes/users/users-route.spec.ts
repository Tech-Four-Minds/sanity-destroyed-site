import request from 'supertest';  
import { app, server } from '../../main';

describe("User Routes", () => {

    afterAll(() => {
        jest.clearAllTimers();
        server.close();
    });

    it("Deve criar um novo usuário", async () => {
        const newUser = {
            username: "novoUsuario",
            password: "senhaSegura123",
        };

        const response = await request(app)
            .post("/api/users/") 
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.username).toBe(newUser.username);
    });

    it("Deve retornar erro ao tentar criar usuário sem nome", async () => {
        const newUser = {
            password: "senhaSemNome",
        };

        const response = await request(app)
            .post("/api/users/")  
            .send(newUser);

        expect(response.status).toBe(400);  
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toBe( "O nome do usuário é obrigatório.");
    });
});
