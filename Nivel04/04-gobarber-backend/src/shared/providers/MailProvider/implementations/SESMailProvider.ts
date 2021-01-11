import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import aws from 'aws-sdk';
import mailConfig from '@config/mail';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

@injectable()
export default class SESEtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-east-1',
      }),
    });
  }

  public async sendMail(mailMessage: ISendMailDTO): Promise<void> {
    if (!this.client) {
      setTimeout(async () => {
        await this.sendMail(mailMessage);
      }, 1000);
    } else {
      const { to, subject, from, templateData } = mailMessage;
      const { name, email } = mailConfig.defaults.from;
      await this.client.sendMail({
        from: {
          name: from?.name || name,
          address: email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    }
  }
}
