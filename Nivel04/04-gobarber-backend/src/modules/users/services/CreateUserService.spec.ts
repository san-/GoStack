import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndoe@teste.tt');
  });

  it('should not be able to create a new user with same e-mail from another', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    await expect(
      createUser.execute({
        name: user.name,
        email: user.email,
        password: user.password || '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with short password', async () => {
    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@teste.tt',
        password: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
