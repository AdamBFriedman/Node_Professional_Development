const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
// Set up partials
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirectoryPath));

// Home
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Adam Friedman",
  });
});

// About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Adam Friedman",
  });
});

// Help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "I am here to help you.",
    name: "Adam Friedman",
  });
});

// Weather
app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location.",
    });
  }

  geocode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.location,
        });
      });
    }
  );

  // res.send({
  //   forecast: "It is snowing",
  //   location: "Philadelphia",
  //   address: req.query.location,
  // });
});

// Catch all for anyone trying to find something after /help
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "Error",
    errorMessage: "Help article not found.",
    name: "Adam Friedman",
  });
});

// 404
app.get("*", (req, res) => {
  res.render("error", {
    title: "Error",
    errorMessage: "Page not found.",
    name: "Adam Friedman",
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
