const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

// Set up Handlebars
app.set("view engine", "hbs");

// Set up static path
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Adam Friedman",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Adam Friedman",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "I am here to help you.",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "It is snowing",
    location: "Philadelphia",
  });
});

app.listen(3000, () => {
  console.log("Server started");
});
