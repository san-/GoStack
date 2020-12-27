import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/providers/StorageProvider/fakes/FakeStorageProvider';
import 'reflect-metadata';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Nobody',
      email: 'johndoe@teste.cc',
    });

    expect(updatedUser?.name).toBe('John Nobody');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });
    const user = await fakeUsersRepository.create({
      name: 'John Nobody',
      email: 'nobody@teste.tt',
      password: '123456',
    });
    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John',
        email: 'johndoe@teste.tt',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Nobody',
      email: 'johndoe@teste.cc',
      password: '123123',
      old_password: 'teste123',
    });

    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Nobody',
        email: 'johndoe@teste.cc',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.tt',
      password: 'teste123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Nobody',
        email: 'johndoe@teste.cc',
        password: '123123',
        old_password: 'wrong_old_pass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
