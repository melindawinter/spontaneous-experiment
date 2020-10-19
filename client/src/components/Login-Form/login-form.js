import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./login-form.css";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
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
    event.preventDefault();

    axios
      .post("/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username
          });
          // update the state to redirect to home
          this.setState({
            redirectTo: "/home"
          });
        }
      })
      .catch(error => {
        console.log("login error: ");
        alert("Invalid login, please try again.");
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
              <h1 className="form-heading">Ready to be spontaneous?</h1>
              <form className="form-horizontal">
                <div className="columns">
                  <div className="form-group">
                    <label className="form-label" htmlFor="username">
                      Username
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
                      Password:{" "}
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
                  <div className="form-group ">
                    <button
                      className="btn btn-lg text-light btn-dark"
                      onClick={this.handleSubmit}
                      type="submit"
                    >
                      Log in
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
export default LoginForm;
