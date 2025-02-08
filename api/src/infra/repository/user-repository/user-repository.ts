import { UserProps } from "../../../domain/entity/users";
import { UserGateway } from "../../../domain/gateway/users.gateway";

export class InMemoryUserRepository implements UserGateway {
  private users: UserProps[] = [];


  async createUser(data: Omit<UserProps, "id">): Promise<UserProps> {
    const { username, password } = data;

    const newUser = {
      id: this.generateId(),  
      username,
      password,
    };

    this.users.push(newUser); 
    return newUser;
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);  
  }
}
