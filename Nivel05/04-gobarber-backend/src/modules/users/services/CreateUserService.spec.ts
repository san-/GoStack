import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
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
});
