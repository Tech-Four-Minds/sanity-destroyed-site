import { UserGateway } from "../../../domain/gateway/users.gateway";
import { BaseUsecase } from "../../usecase";
import { UserProps } from "../../../domain/entity/users";

type CreateUserInput = {
  username: string;
  password: string;
};

export class CreateUserUseCase extends BaseUsecase<CreateUserInput, UserProps | undefined> {
  constructor(private userGateway: UserGateway) {
    super();
  }

  async execute(input: CreateUserInput): Promise<UserProps | undefined> {
    this.validateInput(input);

    try {
      const user = await this.userGateway.createUser(input);
      this.logAction(`Usuário ${user.id} criado com sucesso.`);
      return user;
    } catch (error) {
      if (error instanceof Error) {
        this.handleError(error);
      } else {
        this.handleError(new Error("Erro desconhecido ao criar usuário"));
      }
      return undefined; 
    }
  }

  protected validateInput(input: CreateUserInput): void {
    const { username, password } = input;

    if (!username || username.trim().length === 0) {
      throw new Error("O nome de usuário é obrigatório.");
    }

    if (!password || password.trim().length === 0) {
      throw new Error("A senha é obrigatória.");
    }

    if (password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }
  }

}
