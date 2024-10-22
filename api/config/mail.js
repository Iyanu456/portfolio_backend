const nodemailer = require('nodemailer');

const gmail_transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_SECRET_KEY
  }
});

const mail = async (to, subject, text) => {

  const mailOptions = { 
    from: "oyerindei13@gmail.com", 
    to: to, 
    subject: subject, 
    text: text, 
    html: text,
  };


   // Add event listeners for tracking progress
   gmail_transporter.on('token', token => {
    console.log('A new access token was generated: ', token);
  });

  gmail_transporter.on('idle', () => {
    console.log('Transporter is now idle');
  });

  gmail_transporter.on('error', err => {
    console.error('Error occurred:', err);
  });

  gmail_transporter.on('send', info => {
    console.log('Message sent successfully:', info.response);
  });

  try {
    await gmail_transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = mail;