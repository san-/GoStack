import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const forgotPasswordEmail = container.resolve(ForgotPasswordEmailService);

    await forgotPasswordEmail.execute({
      email,
    });

    return response.status(204).json();
  }
}

export default ForgotPasswordController;
