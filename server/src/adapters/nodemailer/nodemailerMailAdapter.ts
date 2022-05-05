import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mailAdapter'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '98d69d6259a0dd',
    pass: '923a0a805357b9'
  }
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Rodrigo <rodrigo93@gmail.com>',
      subject,
      html: body
    })
  }
}
