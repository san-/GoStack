import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProfileController from '../controllers/ProfileController';
import { valid } from '@hapi/joi';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string().allow(null).allow(''),
      password: Joi.string().when('old_password', {
        is: Joi.string(),
        then: Joi.string().min(6).required(),
        otherwise: Joi.string().allow(null).allow('')
      }),
      password_confirmation: Joi.string().when('old_password', {
        is: Joi.string(),
        then: Joi.string().min(6).required(),
        otherwise: Joi.string().allow(null).allow('')
      }).valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
