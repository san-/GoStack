import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile?.name).toBe('John Doe');
    expect(profile?.email).toBe('johndoe@teste.tt');
  });

  it('should not be able to show inexistent user profile', async () => {
    await expect(
      showProfile.execute({
        user_id: 'inexistent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
