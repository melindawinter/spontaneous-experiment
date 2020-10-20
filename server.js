if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("dotenv").config();
const express = require("express");
const app = express();

const session = require("express-session");
const morgan = require("morgan");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);
const path = require("path");

const passport = require("passport");

const bodyParser = require("body-parser");

const dbConnection = require("./backend/database");

const PORT = process.env.PORT || 8080;

// Route requires
const userRoutes = require("./backend/routes/userRoutes");
const favoriteMoviesRouter = require("./backend/routes/favoriteMoviesRoutes");
const favoriteFoodsRouter = require("./backend/routes/favoriteFoodRoutes");

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/spontaneous-experiment",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// MIDDLEWARE

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(
  session({
    secret: "iamacat",
    // store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

// Passport
app.use(passport.initialize());
app.use(passport.session({ secret: "iamacat" })); // calls the deserializeUser

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(express.json());
// Sessions

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
app.use("/user", userRoutes);
app.use("/favoriteMovies", favoriteMoviesRouter);
app.use("/favoriteFoods", favoriteFoodsRouter);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Starting Server
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
