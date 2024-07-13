const express = require("express");
const hbs = require("hbs");
const path = require("path");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
const weatherData = require("../utils/weatherData");

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, "../public");

const viewsPath = path.join(__dirname, "../templates/views");

const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: true }));

let db;




app.get("", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("Address is required");
  }
  weatherData(req.query.address, (error, result) => {
    if (error) {
      return res.send(error);
    }

    res.send(result);
  });
});

// MongoDB Connection
MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB");
    db = client.db("WeatherApp");
  })
  .catch((error) => console.error(error));

app.get("", (req, res) => {
  res.render("index", { title: "Weather App" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Address is required" });
  }
  weatherData(req.query.address, (error, result) => {
    if (error) {
      return res.send({ error });
    }
    res.send(result);
  });
});

app.post("/weather", (req, res) => {
  const { email, address, temperature, weatherCondition, date } = req.body;
  const userDetails = { email, address, temperature, weatherCondition, date };

  db.collection("userdetails").insertOne(userDetails, (err, result) => {
    if (err) {
      return res.send({ error: "Error storing data" });
    }
    res.send({ success: "Data stored successfully" });
  });
});
app.put('/weather', (req, res) => {
  const { email, address, temperature, weatherCondition, date } = req.body;
  
  db.collection('userdetails').findOneAndUpdate(
    { email: email }, // Find document by email
    { $set: { address, temperature, weatherCondition, date } }, // Update fields
    { returnOriginal: false, upsert: true }, // Options: return updated document, create if not found
    (err, result) => {
      if (err) {
        console.error('Error updating data:', err);
        return res.status(500).json({ error: 'Failed to update data', details: err });
      }
      if (!result.value) {
        return res.status(404).json({ error: 'No matching record found for update' });
      }
      res.json({ message: 'Data updated successfully', data: result.value });
    }
  );
});




app.get("*", (req, res) => {
  res.render("404", { title: "Page not found" });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

// Define your schema and model
const weatherSchema = new mongoose.Schema({
  email: String,
  address: String,
  temperature: String,
  weatherCondition: String,
  date: String
});

const Weather = mongoose.model('Weather', weatherSchema);

app.post('/weather', (req, res) => {
  const { email, address, temperature, weatherCondition, date } = req.body;

  console.log("Received data:", req.body);

  const weatherData = new Weather({
      email,
      address,
      temperature,
      weatherCondition,
      date
  });

  weatherData.save()
      .then(() => res.json({ message: 'Data saved successfully' }))
      .catch(err => res.json({ error: 'Failed to save data', details: err }));
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/weatherapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000, () => console.log('Server is running on port 3000')))
  .catch(err => console.error('Failed to connect to MongoDB', err));