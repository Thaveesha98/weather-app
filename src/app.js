const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode, weather } = require("../utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, "../public");
const pathViews = path.join(__dirname, "../templates/views");
const pathPartials = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", pathViews);
hbs.registerPartials(pathPartials);

app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About the Weather App",
    name: "Thaveesha Yanith",
    occupation: "Software Developer",
    description:
      "Our weather app provides real-time weather updates and forecasts, making it easier for users to stay informed about the weather conditions anywhere in the world.",
    mission:
      "We aim to deliver the most accurate and timely weather information using trusted data sources, ensuring the best service for our users.",
    features: [
      "Real-time weather updates",
      "Weather forecasts",
      "Easy-to-use interface",
      "Global coverage",
    ],
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Contact Us",
    formTitle: "Feel free to reach out to us through the form below:",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please select a location",
    });
  }
  geocode(req.query.location, (error, data) => {
    if (error) {
      return res.send({ error: "Error:", error });
    } else {
      const { latitude, longitude } = data;
      weather(`${latitude},${longitude}`, (error, weatherData) => {
        if (error) {
          return res.send({ Error: error });
        } else {
          const {
            location,
            country,
            region,
            weather_description,
            temperature,
            feelslike,
            humidity,
          } = weatherData;
          res.send({
            location: `${location} , ${country} , ${region}`,
            weatherCondition: weather_description,
            temp: temperature,
            feelslike: feelslike,
            humidity: humidity,
          });
        }
      });
    }
  });
});
app.get("/about/*", (req, res) => {
  res.render("404", {
    title: "content missing",
    description: "The about page content you're looking for cannot be found.",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 - Page Not Found",
    description: "The page you're looking for cannot be found.",
  });
});

app.listen(port, () => {
  console.log(`server listening on ${port}`);
});
