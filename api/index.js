// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
const send_mail = require('./routes/send_mail');

const app = express();


app.use(cors({

  origin: process.env.ORIGIN,

  methods: [
    'GET', 
    'POST', 
    'PUT', 
    'DELETE', 
    'OPTIONS'
    ],

  allowedHeaders: [
  'Content-Type', 
  'Authorization',
  'x-secret-key'
  ],

}));
app.options('*', cors()); 

app.use(bodyParser.json());
app.use(passport.initialize());




// Middleware to check for the secret key
const validateSecretKey = (req, res, next) => {
  const secretKey = req.headers['x-secret-key'];
  if (secretKey === process.env.SECRET_KEY) {
    next(); // The key is valid, proceed to the route handler
  } else {
    console.log(`Unauthorized attempt with key: ${secretKey}`); // Log unauthorized attempt
    return res.status(403).json({
      message: "Forbidden: Unauthorized",
      status: "failed",
      ok: false,
    });
  }
};

// Apply secret key middleware globally (protect all routes)
app.use(validateSecretKey);

// Middleware


// Routes
app.use('/api/send_mail', send_mail);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
