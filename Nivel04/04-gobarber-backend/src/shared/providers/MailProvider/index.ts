import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';
import IMailProvider from './models/IMailProvider';

const mailProviders = {
  ethereal: EtherealMailProvider,
  ses: SESMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailProviders[mailConfig.driver],
);
