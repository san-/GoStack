import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import 'reflect-metadata';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Prestador 1',
      email: 'prestador1@teste.tt',
      password: 'teste123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Prestador 2',
      email: 'prestador2@teste.tt',
      password: 'teste123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers.length).toBe(2);
    expect(providers).toEqual([user1, user2]);
    // expect(providers).not.toContain(loggedUser);
  });
});
