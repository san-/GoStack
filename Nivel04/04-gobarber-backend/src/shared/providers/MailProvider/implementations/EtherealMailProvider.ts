import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer
      .createTestAccount()
      .then(account => {
        this.client = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  public async sendMail(mailMessage: ISendMailDTO): Promise<void> {
    if (!this.client) {
      setTimeout(async () => {
        await this.sendMail(mailMessage);
      }, 1000);
    } else {
      const { to, subject, from, templateData } = mailMessage;
      const message = await this.client.sendMail({
        from: {
          name: from?.name || 'Equipe GoBarber',
          address: from?.email || 'equipe@gobarber.com.br',
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
      console.log('Mail sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
  }
}
