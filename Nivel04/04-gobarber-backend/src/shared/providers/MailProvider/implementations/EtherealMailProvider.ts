import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
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

  public async sendMail(to: string, body: string): Promise<void> {
    if (!this.client) {
      setTimeout(async () => {
        await this.sendMail(to, body);
      }, 1000);
    } else {
      const message = await this.client.sendMail({
        from: 'GoBarber <gobarber@gobarber.com.br>',
        to,
        subject: 'Recuperação de senha',
        text: body,
        html: body,
      });
      console.log('Mail sent: %s', message.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }
  }
}
