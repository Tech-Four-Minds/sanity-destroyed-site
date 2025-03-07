import bcrypt from "bcryptjs";

export type UserProps = {
    id?: string;
    username: string;
    password: string; 
};

export class User {
    private constructor(private props: UserProps & { password: string }) {}

    public static async create(username: string, password: string, id?: string): Promise<User> {
        this.validateUsername(username);

        if (!password || password.length < 6) {
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return new User({ id: id || "", username, password: hashedPassword });
    }

    public static with(props: UserProps): User {
        return new User(props);
    }

    private static validateUsername(username: string): void {
        if (!username || username.trim().length === 0) {
            throw new Error("O nome do usuário é obrigatório.");
        }

        if (username.length < 3) {
            throw new Error("O nome do usuário deve ter pelo menos 3 caracteres.");
        }
    }

    public get id(): string {
        return this.props.id || "";
    }

    public get username(): string {
        return this.props.username;
    }

    public getHashedPassword(): string {
        return this.props.password;
    }

    public set username(value: string) {
        User.validateUsername(value);
        this.props.username = value;
    }

    public async changePassword(newPassword: string): Promise<void> {
        if (!newPassword || newPassword.length < 6) {
            throw new Error("A nova senha deve ter pelo menos 6 caracteres.");
        }

        this.props.password = await bcrypt.hash(newPassword, 10);
    }

    public async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.props.password);
    }
}
