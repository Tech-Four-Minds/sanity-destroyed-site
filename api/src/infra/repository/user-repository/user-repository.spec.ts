import { InMemoryUserRepository } from "./user-repository";

describe("InMemoryUserRepository", () => {
  let userRepository: InMemoryUserRepository;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();  
  });

  it("deve criar um usuário com sucesso", async () => {
    const newUser = {
      username: "testuser",
      password: "password123",
    };

    const createdUser = await userRepository.createUser(newUser);  

    expect(createdUser).toHaveProperty("id");  
    expect(createdUser.username).toBe(newUser.username); 
  });
});
