import React, { Component } from "react";
import "./home.css";
import Fade from "../Fade/Fade";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div className="homePage__Main">
        {/* Movie Section */}
        <div className="container-flex movieSection">
          <Fade>
            <div className="container-flex home_section">
              <div className="col-sm-6 col-m-6 col-lg-4  section__card fade-in2">
                <Link to="/movie" className="section__link">
                  <div className="section__content fade-in2">
                    <h1>Movie Randomizer</h1>
                    <p>
                      Don't wanna think too hard when picking a movie?
                      <br /> <br />
                      Let us do it for you! <br /> <br />
                      Click on this card to head over to the movie page.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </Fade>
        </div>

        {/* Restaurant Section */}
        <div className="container-flex restaurantSection">
          <Fade>
            <div className="container-flex home_section">
              <div className="col-sm-6 col-m-6 col-lg-4 section__card">
                <Link to="/restaurant" className="section__link">
                  <div className="section__content">
                    <h1>Restaurant Randomizer</h1>
                    <p>
                      We often ask "What do you wanna eat?"
                      <br /> <br />
                      Well, how about letting us decide that too?
                      <br /> <br />
                      Click on this card to head over to the restaurants page.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </Fade>
        </div>

        {/* Favorites Section */}
        <div className="container-flex favoriteSection">
          <Fade>
            <div className="container-flex home_section">
              <div className="col-sm-6 col-m-6 col-lg-4 section__card">
                <Link to="/favorites" className="section__link">
                  <div className="section__content">
                    <h1>Crowd Favorites</h1>
                    <p>
                      Sometimes we make decisions based on other people's
                      preferences.
                      <br /> <br />
                      See movies and restaurants chosen by other users!
                      <br /> <br />
                      Click on this card to head over to the favorites page.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default Home;
