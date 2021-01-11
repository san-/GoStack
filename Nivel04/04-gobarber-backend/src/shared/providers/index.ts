import { container } from 'tsyringe';

import mailConfig from '@config/mail';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTamplateProvider';
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ses' ? SESMailProvider : EtherealMailProvider,
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);
