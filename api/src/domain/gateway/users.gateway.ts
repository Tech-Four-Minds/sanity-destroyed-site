import { User, UserProps } from "../entity/users";

export interface UserGateway {
    createUser(data: Omit<UserProps, "id">): Promise<UserProps>;
    findByUsername(username: string): Promise<User | null>;
}