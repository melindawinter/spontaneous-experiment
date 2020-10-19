import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./sign-up.css";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      redirectTo: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    console.log("sign-up handleSubmit, username: ");
    console.log(this.state.username);
    event.preventDefault();

    //request to server to add a new username/password
    axios
      .post("/user/", {
        username: this.state.username,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
      .then(response => {
        console.log(response);
        if (
          !response.data.errmsg &&
          this.state.password === this.state.confirmPassword
        ) {
          console.log("successful signup");
          alert("Signup was a success!");
          this.setState({
            //redirect to login page
            redirectTo: "/login"
          });
        } else {
          console.log("username already taken");
        }
      })
      .catch(error => {
        console.log("signup error: ");
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    } else {
      return (
        <div className="container grid-lg form-container">
          <div className="formColumns col-12 ">
            <div className="SignupForm col-12">
              <h1 className="form-heading">Join our community</h1>
              <form className="form-horizontal ">
                <div className="columns">
                  <div className="form-group">
                    <label className="form-label" htmlFor="username">
                      Pick your username:
                    </label>

                    <input
                      className="form-input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="username"
                      value={this.state.username}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="columns">
                  <div className="form-group">
                    <label className="form-label" htmlFor="password">
                      Enter a password:{" "}
                    </label>

                    <input
                      className="form-input"
                      placeholder="password"
                      type="password"
                      name="password"
                      value={this.state.password}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="columns">
                  <div className="form-group">
                    <label className="form-label" htmlFor="confirmPassword">
                      Type that password again:{" "}
                    </label>

                    <input
                      className="form-input"
                      placeholder="confirm password"
                      type="password"
                      name="confirmPassword"
                      value={this.state.confirmPassword}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="columns">
                  <div className="form-group ">
                    <button
                      className="btn btn-lg text-light btn-dark"
                      onClick={this.handleSubmit}
                      type="submit"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Signup;
