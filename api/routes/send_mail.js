const express = require("express");
const { send_mail } = require("../controllers/mail_controller");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log("Request received");

  try {
    const { name, email, message } = req.body; // Extracting from the request body

    // Call send_mail with correct arguments
    await send_mail(
      "oyerindei13@gmail.com", // The "to" email address
      `Someone visited your site`, // The subject of the email
      `You have a message ${name !== "" ? `from ${name}` : ""}<br><br>
      <b>Email:</b> ${email}<br><br>
      <b>Message:</b> ${message}` // The email body
    );

    await send_mail(
      email, // The "to" email address
      `Thank you for reaching out, ${name}!`, // The subject of the email
      `Hi ${name},<br></br><br></br>

Thank you for getting in touch through my portfolio website. I’ve received your message and will get back to you as soon as possible.
<br></br>
<br></br>
Here’s a summary of the details you provided:<br></br><br></br>
<b>- Email:</b> ${email}<br></br>
<b>- Message:</b> ${message}


<br></br><br></br>
If you have any additional information to share or need to follow up, feel free to reply to this email. 

<b>Looking forward to connecting with you!</b>
<br></br><br></br>
Best regards,<br></br>  
Iyanuoluwa. <br></br>
https://iyanu.vercel.app` // The email body
    );

    res.status(200).json({ message: "Email sent successfully", ok: true });
  } catch (error) {
    console.error("Error in route:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

module.exports = router;
