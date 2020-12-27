import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const { filename: avatarFilename } = request.file;

    const { id: user_id } = request.user;

    const user = await updateUserAvatar.execute({ user_id, avatarFilename });

    return response.json(classToClass(user));
  }
}
