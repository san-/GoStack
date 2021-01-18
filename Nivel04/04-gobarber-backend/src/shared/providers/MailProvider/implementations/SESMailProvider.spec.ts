import 'reflect-metadata';
import path from 'path';
import IMailProvider from '../models/IMailProvider';
import SESMailProvider from './SESMailProvider';
import HandlebarsMailTemplateProvider from '../../MailTemplateProvider/implementations/HandlebarsMailTamplateProvider';

let provider: IMailProvider;

describe('SESMailProvider', () => {
  beforeEach(() => {
    provider = new SESMailProvider(new HandlebarsMailTemplateProvider());
  });

  it('should be able to send an email using SES Provider', async () => {
    const forgotPasswordTemplate = path.resolve(__dirname, 'ses_teste.hbs');
    await provider.sendMail({
      to: { email: 'sandrovalgoi@gmail.com', name: 'Sandro Valgoi' },
      subject: '[GoBarber] Teste',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: 'Sandro',
          link: `http://google.com.br`,
        },
      },
    });
    expect(true).toBe(true);
  });
});
