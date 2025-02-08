import { CreateUserUseCase } from './create-user.usecase';
import { UserGateway } from '../../../domain/gateway/users.gateway';
import { UserProps } from '../../../domain/entity/users';

const mockUserGateway: jest.Mocked<UserGateway> = {
  createUser: jest.fn()
};

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserGateway);
  });

  it('deve criar um novo usuário com sucesso', async () => {
    const input = {
      username: 'testuser',
      password: 'password123'
    };

    const createdUser: UserProps = {
      id: '1',
      username: 'testuser',
      password: 'password123'
    };

    mockUserGateway.createUser.mockResolvedValue(createdUser);

    const result = await createUserUseCase.execute(input);

    expect(result).toEqual(createdUser);
    expect(mockUserGateway.createUser).toHaveBeenCalledWith(input);
    expect(mockUserGateway.createUser).toHaveBeenCalledTimes(1);
  });

  it('deve lançar erro se o nome de usuário for inválido', async () => {
    const input = {
      username: '',
      password: 'password123'
    };

    await expect(createUserUseCase.execute(input)).rejects.toThrowError('O nome de usuário é obrigatório.');
  });

  it('deve lançar erro se a senha for inválida', async () => {
    const input = {
      username: 'testuser',
      password: 'short'
    };

    await expect(createUserUseCase.execute(input)).rejects.toThrowError('A senha deve ter pelo menos 6 caracteres.');
  });

  it('deve lançar erro se o usuário não fornecer um nome de usuário', async () => {
    const input = {
      username: '',
      password: 'password123'
    };

    await expect(createUserUseCase.execute(input)).rejects.toThrowError('O nome de usuário é obrigatório.');
  });

  it('deve lançar erro se o usuário não fornecer uma senha', async () => {
    const input = {
      username: 'testuser',
      password: ''
    };

    await expect(createUserUseCase.execute(input)).rejects.toThrowError('A senha é obrigatória.');
  });
});
