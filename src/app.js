const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express(); // express is a function that needs to be used;
const port = process.env.PORT || 3000;

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public"); // from where all the assets like pictures and css is being thrown.
const viewsPath = path.join(__dirname, "../templates/views"); // from where all the views must be accessed
const partialsPath = path.join(__dirname, "../templates/partials"); // from where all the partials can be accessed.

app.set("view engine", "hbs"); // to setup a setting called as view engine for express.
app.set("views", viewsPath); // to setup the views path which tells express where to look for files.
hbs.registerPartials(partialsPath); // to setup the partials that the handlebars need.
app.use(express.static(publicDirectoryPath)); // to serve up the html file. (to serve up all the static files like pictures and other css files.)

// dummy routes being initiated.

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Gaurav"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is the help page.",
    title: "help",
    name: "Gaurav"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    // about is the name of the file that needs to be rendered and the object contains values that can be used in the hbs file.
    title: "about me",
    name: "Gaurav"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide the address."
    });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({
            error
          });
        }
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error
            });
          }
          res.send({
            location,
            forecast: forecastData,
            address: req.query.address
          });
        });
      }
    );
  }
  // res.send({
  //   forecast: "It is cold.",
  //   location: "Banashankari",
  //   address: req.query.address
  // });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term."
    });
  }
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  // to match any route beginning with /help
  res.render("404", {
    title: "404",
    name: "Gaurav",
    error: "Help article not found"
  });
});

app.get("*", (req, res) => {
  // to match all the routes except the specified ones.
  res.render("404", {
    error: "Page not found",
    title: "404",
    name: "Gaurav"
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
