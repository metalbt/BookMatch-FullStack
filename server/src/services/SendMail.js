import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';
 
async function createNewUser(to) {
  try {
    const config = await mailConfig();
 
    const transporter = nodemailer.createTransport(config);
 
    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no BookMatch',
      text: `Conta criada com sucesso.\n\nAcesse o site para gerenciar seu perfil e receber recomendações de livros.`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o site para gerenciar seu perfil e receber recomendações de livros.</p>`,
    });
 
    if (process.env.NODE_ENV === 'development') {
      console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
    }
  } catch (err) {
    throw new Error(err);
  }
}
 
export default { createNewUser };