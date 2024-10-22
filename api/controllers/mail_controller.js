const nodemailer = require('nodemailer');

// Update this function to accept arguments directly
exports.send_mail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS, // Your email
        pass: process.env.EMAIL_SECRET_KEY, // Your email password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // sender address
      to, // list of receivers
      subject, // Subject line
  
      text: text, 
    html: text,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Let the error bubble up
  }
};
