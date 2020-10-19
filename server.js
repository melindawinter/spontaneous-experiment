if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./backend/database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./backend/passport");
const app = express();
// const PORT = 8080;
// Route requires
const user = require("./backend/routes/userRoutes");
const favoriteMoviesRouter = require("./backend/routes/favoriteMoviesRoutes");
const favoriteFoodsRouter = require("./backend/routes/favoriteFoodRoutes");
const mongoose = require("mongoose");
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
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(express.json());
// Sessions
app.use(
  session({
    secret: "iamacat", //pick a random string to make the hash that is generated secure
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false, //required
    saveUninitialized: false //required
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
app.use("/user", user);
app.use("/favoriteMovies", favoriteMoviesRouter);
app.use("/favoriteFoods", favoriteFoodsRouter);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Starting Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`);
});
