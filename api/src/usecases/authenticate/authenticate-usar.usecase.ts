import { UserGateway } from "../../domain/gateway/users.gateway";
import { BaseUsecase } from "../usecase";
import jwt from "jsonwebtoken";

type AuthenticateUserInput = {
    username: string;
    password: string;
};

export class AuthenticateUserUseCase extends BaseUsecase<AuthenticateUserInput, string | undefined> {
    constructor(private userGateway: UserGateway) {
        super();
    }

    async execute(input: AuthenticateUserInput): Promise<string | undefined> {
        this.validateInput(input);

        try {
            const user = await this.userGateway.findByUsername(input.username);

            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            const isPasswordValid = await user.validatePassword(input.password);
            if (!isPasswordValid) {
                throw new Error("Senha inválida.");
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'default_secret', { expiresIn: '1h' });
            return token;

        } catch (error) {
            this.handleError(new Error(error instanceof Error ? error.message : "Erro desconhecido ao autenticar usuário"));
            return undefined;
        }
    }

    protected validateInput(input: AuthenticateUserInput): void {
        const { username, password } = input;

        if (!username || username.trim().length === 0) {
            throw new Error("O nome de usuário é obrigatório.");
        }

        if (!password || password.trim().length === 0) {
            throw new Error("A senha é obrigatória.");
        }
    }
}
