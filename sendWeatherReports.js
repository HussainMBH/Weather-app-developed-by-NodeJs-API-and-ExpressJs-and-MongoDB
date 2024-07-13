// Import necessary modules
const nodemailer = require('nodemailer');
require('dotenv').config();

// Initialize Nodemailer transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Function to send weather report email
function sendWeatherEmail(email, weatherData) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Hourly Weather Report',
    html: `<p>Here is your hourly weather report:</p>
           <p>Temperature: ${weatherData.temperature}</p>
           <p>Weather Condition: ${weatherData.weatherCondition}</p>
           <p>Date: ${weatherData.date}</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Example usage: send weather report to a list of emails
const emailsToSend = ['naascampus114@gmail.com', 'mohamedbahirhussain@gmail.com'];

emailsToSend.forEach(email => {
  // Replace with actual weather data fetching logic
  emailsToSend.forEach(email => {
    const weatherData = {
      temperature: '25°C',
      weatherCondition: 'Sunny',
      date: new Date().toISOString()
    };

    sendWeatherEmail(email, weatherData);
  });
}, 1 * 60 * 1000);
