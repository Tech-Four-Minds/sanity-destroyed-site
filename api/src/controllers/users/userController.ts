import { Request, Response } from "express";
import { PrismaUserRepository } from "../../infra/repository/user-repository/prisma-user-repository";

export class UserController {

    private userGateway = new PrismaUserRepository();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário.
 *     description: Adiciona um novo usuário ao banco de dados.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuários'  
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 *       400:
 *         description: Erro na criação do usuário.
 *       500:
 *         description: Erro interno no servidor.
 */

    async createUser (req: Request, res: Response): Promise<void> {
        const {username,password} = req.body;
        try {
            const user = await this.userGateway.createUser({
                username,
                password
            });
            res.status(201).json(user)
        }catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Erro interno no servidor." });
            }
        }
    };
}