if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const session = require("express-session");
const dbConnection = require("./database");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");
const app = express();
const PORT = 8080;
// Route requires
const user = require("./backend/routes/user");
const favoriteMoviesRouter = require("./backend/routes/favoriteMovies");
const favoriteFoodsRouter = require(".backend/routes/favoriteFood");

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
app.use("/users", user);
app.use("/favoriteMovies", favoriteMoviesRouter);
app.use("/favoriteFoods", favoriteFoodsRouter);

// Send every other request to the React app
// Define any API routes before this runs
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// Starting Server
app.listen(PORT, () => {
  console.log(`App listening on PORT: http://localhost:${PORT}`);
});
