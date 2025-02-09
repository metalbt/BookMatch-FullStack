import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';
import os from 'os';
import moment from 'moment';

async function sendLoginNotification(to, ip) {
  try {
    const config = await mailConfig();
    const transporter = nodemailer.createTransport(config);

    const dateTime = moment().format('DD/MM/YYYY HH:mm:ss');
    const deviceInfo = `${os.type()} ${os.release()}`;

    const emailText = `
      Detectamos um login recente na sua conta em nosso site BookMatch.

      Informações do Acesso:
      - Data e Hora: ${dateTime}
      - Endereço IP: ${ip}
      - Dispositivo: ${deviceInfo}

      Se você reconhece este acesso, não é necessário fazer nada.
      Caso não tenha sido você, recomendamos alterar sua senha imediatamente e entrar em contato com nosso suporte.

      Atenciosamente,
      Equipe BookMatch
    `;

    const emailHtml = `
      <h1>Aviso de Acesso à Sua Conta</h1>
      <p>Detectamos um login recente na sua conta em nosso site <strong>BookMatch</strong>.</p>
      <p><strong>Informações do Acesso:</strong></p>
      <ul>
        <li>Data e Hora: ${dateTime}</li>
        <li>Endereço IP: ${ip}</li>
        <li>Dispositivo: ${deviceInfo}</li>
      </ul>
      <p>Se você reconhece este acesso, não é necessário fazer nada.<br>
      Caso não tenha sido você, recomendamos alterar sua senha imediatamente e entrar em contato com nosso suporte.</p>
      <p>Atenciosamente,<br>Equipe BookMatch</p>
    `;

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Aviso de Acesso à Sua Conta',
      text: emailText,
      html: emailHtml,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}

export default { sendLoginNotification };
