import { UserProps } from "../../../domain/entity/users";
import { UserGateway } from "../../../domain/gateway/users.gateway";
import { PrismaClient } from "@prisma/client";
import { User } from "../../../domain/entity/users";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserGateway {
    async createUser(data: Omit<UserProps, "id">): Promise<UserProps> {
        const user = await User.create(
            data.username,
            data.password

        );

        const createdUser = await prisma.user.create({
            data: {
                username: user.username,
                password: user.getHashedPassword()

            }
            
        });

        return this.mapPrismaUser(createdUser);
        
    }

    async findByUsername(username: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: { username }
        });
    
        if (!user) {
            return null;
        }
    
        return User.with({
            id: user.id,
            username: user.username,
            password: user.password
        });
    }
    

    private mapPrismaUser(user: any): UserProps {
        return {
            id: user.id,
            username: user.username,
            password: user.password
        };
    }
}