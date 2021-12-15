const path = require("path");
const express = require("express");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates");

// Set up Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Set up static directory to serve
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
