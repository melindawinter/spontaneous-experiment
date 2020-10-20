import React, { Component } from "react";
import axios from "axios";
import { Route, Switch } from "react-router-dom";

// components
import Signup from "../src/components/Sign-up/sign-up";
import LoginForm from "./components/Login-Form/login-form";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/home";
import Movie from "./components/Movie/Movie";
import Restaurant from "./components/Restaurant/Restaurant";
import Favorites from "./components/Favorites/Favorites";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/Landing";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      favoriteMovies: [],
      favoriteFoods: [],
      redirectTo: null
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
  }

  componentDidMount() {
    this.getUser();
    if (!this.state.favoriteMovies.length) {
      this.getMovieDB();

      if (!this.state.favoriteFoods.length) {
        this.getFoodDB();
      }
    }
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  updateStatus() {
    document.location.href = "/";
    console.log("Status updated");
  }

  getUser() {
    axios.get("/users").then(response => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }

  getMovieDB() {
    fetch("/favoriteMovies")
      .then(res => res.json())
      .then(data => {
        this.setState({ ...this.state, favoriteMovies: data });
      });
  }

  getFoodDB() {
    fetch("/favoriteFoods")
      .then(res => res.json())
      .then(data => {
        this.setState({ ...this.state, favoriteFoods: data });
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar
          updateUser={this.updateUser}
          loggedIn={this.state.loggedIn}
          updateStatus={this.updateStatus}
          username={this.state.username}
        />

        {this.state.loggedIn}
        {/* Routes to different components */}
        <Switch>
          <Route
            exact
            path="/home"
            component={() => {
              return <Home username={this.state.username} />;
            }}
          />
          <Route
            exact
            path="/favorites"
            component={() => {
              return (
                <Favorites
                  databaseInfo={this.state.favoriteMovies}
                  foodDatabase={this.state.favoriteFoods}
                />
              );
            }}
          />
          <Route path="/restaurant" component={Restaurant} />
          <Route exact path="/movie" component={Movie} />
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/login"
            render={() => <LoginForm updateUser={this.updateUser} />}
          />
          <Route path="/signup" render={() => <Signup />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
// }

export default App;
