// pages/api/sendEmail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    //console.log('Dados de email: ', req.body);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SERVER,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      logger: true,
      debug: true,
    });
    
    
    try {
      // Enviar o email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email, // Pode ser um email fixo ou dinâmico baseado no request
        subject: ` Mensagem de ${name}`,
        text: `Codigo para validar o se email ${message}`,
      });

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ error: 'Error sending email', details: error });
      console.log('Causa do erro: ', error.message);
      
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
