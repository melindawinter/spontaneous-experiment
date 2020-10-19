import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import axios from "axios";
import "./navbar.css";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }
  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            username: null
          });
          this.props.updateStatus({
            loginStatus: false
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }
  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark">
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <li className="navbar-toggler-icon"></li>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {loggedIn ? (
              <ul className="navbar-nav ">
                <h3 className="navbar-brand">
                  Have a great weekend, {this.props.username}!
                </h3>

                <Link to="/" className="nav-link " onClick={this.logout}>
                  <li className="nav-item list-unstyled">Log Out</li>
                </Link>
                <Link to="/home" className="nav-link">
                  <li className="nav-item list-unstyled">Home</li>
                </Link>
                <Link to="/movie" className="nav-link">
                  <li className="nav-item list-unstyled">Movies</li>
                </Link>
                <Link to="/restaurant" className="nav-link">
                  <li className="nav-item list-unstyled">Restaurants</li>
                </Link>
                <Link to="/favorites" className="nav-link">
                  <li className="nav-item list-unstyled">Favorites</li>
                </Link>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <Link to="/" className="nav-link">
                  <li className="nav-item list-unstyled">Home</li>
                </Link>
                <Link to="/login" className="nav-link">
                  <li className="nav-item list-unstyled">Log In</li>
                </Link>
                <Link to="/signup" className="nav-link">
                  <li className="nav-item list-unstyled">Sign Up</li>
                </Link>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;
