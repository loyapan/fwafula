const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');


const app = express();

// Parse form data as JSON
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

// Create POST endpoint
app.post('/contact',  [
    // Validate the form data
    check('name').not().isEmpty().withMessage('Name is required'),
    check('phone').not().isEmpty('Phone is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('message').not().isEmpty().withMessage('Message is required')
  ], (req, res) => {
    // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send a response with the errors
    return res.status(400).send(errors.array().map(error => error.msg).join('\n'));
  }
    // Get the form data
    const name = req.body.name;
    const phone =  req.body.phone;
    const email = req.body.email;
    const message = req.body.message;

    // Send a response to the client
  res.send('Thank you for your message!');

  // Create the transporter object
  let transporter = nodemailer.createTransport({
    host: 'http://127.0.0.1:5501',
    port: 465,
    secure: true,
    auth: {
      user: 'adamsechwa95@gmail.com',
      pass: 'password'
    }
  });

  // Define the email options
  let mailOptions = {
    from: '"Contact Form" <contact@example.com>',
    to: 'adamsechwa95@gmail.com',
    subject: 'Contact Form Submission',
    text: `From: ${name} <${email}>\n\n${message}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.send('There was a problem sending the email');
    } else {
      console.log(`Email sent: ${info.response}`);
      res.send('Thank you for your message!');
    }
});

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})