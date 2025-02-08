import swaggerJSDoc from "swagger-jsdoc";

const swaggerOption = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API da Sanity Destroyed",
            version: "1.0.0",
            description: "Documentação das rotas da API",
        },
        servers: [
            {
                url: "http://localhost:3333/api",
            },
        ],
        tags: [
            {
                name: "Produtos",
                description: "Rotas relacionadas ao gerenciamento de produtos",
            },
            {
                name: "Eventos",
                description: "Rotas relacionadas ao gerenciamento de eventos",
            },
            {
                name: "Notícias",
                description: "Rotas relacionadas ao gerenciamento de notícias",
            },
            {
                name: "Usuários",
                description: "Rotas relacionadas ao gerenciamento de Usuários",
            },
            {
                name: "Login",
                description: "Rotas relacionadas ao Login de Usuários",
            },

        ],
        components: {
            securitySchemes: {
                Auth: {
                    type: "apiKey",
                    in: "header",
                    name: "Authorization",
                    description: "Passe o token JWT diretamente no cabeçalho."
                },
            },
            schemas: {
                Produtos: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Camisa Sanity Destroyed" },
                        price: { type: "number", example: 50 },
                        type: { type: "string", example: "Vestimenta" },
                        size: { type: "string", example: "M" },
                        quantity: { type: "number", example: 10 },
                        image: { type: "string", example: "http://example.com/produto.jpg" },
                    },
                },
                Eventos: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Concerto de Rock" },
                        location: { type: "string", example: "Parque Dona Lindu" },
                        date: { type: "string", format: "date", example: "2025-05-20T18:00:00.000Z" },
                        schedule: { type: "string", example: "18:00 - 23:00" },
                        price: { type: "number", example: 100.50 },
                        ticket: { type: "string", example: "ingressos.com" },
                        status: { type: "boolean", example: true },
                        image: { type: "string", example: "http://example.com/evento.jpg" },
                    },
                },
                Noticias: {
                    type: "object",
                    properties: {
                        name: { type: "string", example: "Make Off do Clip" },
                        date: { type: "string", format: "date", example: "2025-01-31" },
                        description: { type: "string", example: "Lançamento do Make Off do Clip da banda Sanity Destroyed" },
                    },
                },
                Usuários: {
                    type: "object",
                    properties: {
                        username: { type: "string", example: "Edinho_do_Gera" },
                        password: { type: "string", example: "123456@" },
                    },
                },
                Erro: {
                    type: "object",
                    properties: {
                        error: { type: "string", example: "Recurso não encontrado ou inválido" },
                    },
                },
            },
            security: [
                {
                    Auth: [],
                },
            ],
        },
    },
    apis: ["./src/controllers/**/*.ts"], 
};

const swaggerSpecs = swaggerJSDoc(swaggerOption);

export { swaggerSpecs };
