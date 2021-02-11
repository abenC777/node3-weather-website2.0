const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars as view engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setting up public directory path
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Aben Cermeno",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About page",
    name: "Aben Cermeno",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Aben Cermeno",
    helpMessage: "This is the help page.",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: "You must enter a valid address",
    });
  }

  geocode(address, (error, { longitude, latitude, location } = {}) => {
    {
      if (error) {
        return res.send({
          error: error,
        });
      }
      forecast(longitude, latitude, (error, forecastResponse) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send({
          address,
          forecast: forecastResponse,
          location: location,
        });
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aben Cermeno",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Aben Cermeno",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server running on port " + port);
});
