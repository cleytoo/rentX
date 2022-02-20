import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((acc) => {
        this.client = nodemailer.createTransport({
          host: acc.smtp.host,
          port: acc.smtp.port,
          secure: acc.smtp.secure,
          auth: {
            user: acc.user,
            pass: acc.pass,
          },
        });
      })
      .catch((err) => console.error(err));
  }

  async sendMail(
    to: string,
    subject: string,
    variables: unknown,
    path: string
  ): Promise<void> {
    const templateFile = fs.readFileSync(path).toString("utf-8");

    const templateParse = handlebars.compile(templateFile);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreply@rentx.com>",
      subject,
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
