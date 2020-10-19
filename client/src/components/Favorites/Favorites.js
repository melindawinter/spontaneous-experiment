import React from "react";
import "./Favorite.css";
import Fade from "../Fade/Fade";
import { v4 as uuidv4 } from "uuid";

function Favorites(props) {
  // ============= Test to see what as in here =============
  console.log(props.databaseInfo);

  return (
    <div className="mainContainer container-fluid">
      <div className="col-sm-12 col-m-6 col-lg-6 ml-auto mr-auto">
        <h1 className="favorite__header">Check out some crowd favorites</h1>
      </div>
      <button
        className="favorites__refresh"
        onClick={() => window.location.reload(false)}
      >
        Refresh Favorites
      </button>

      {props.databaseInfo.length || props.foodDatabase.length ? (
        <div className="container-fluid subContainer">
          <div className=" movie__row">
            <h1 className="favorite__header">
              Movies <i className="fas fa-film"></i>
            </h1>
            <button
              className="favorites__refresh sub__faveMovie"
              type="button"
              data-toggle="collapse"
              data-target="#collapseMovie"
              aria-expanded="false"
              aria-controls="collapseMovie"
            >
              See the list of favorite movies
            </button>
            <div className="collapse" id="collapseMovie">
              {props.databaseInfo.map(movie => (
                // Needed for differentiation
                <Fade key={uuidv4()}>
                  <div className="movie__SubRow fade-in2" key={movie._id}>
                    <div className="movie__title">
                      <i className="fas fa-film"></i> {movie.title}
                    </div>
                    <div className="movie__rating">
                      {movie.rating} <i className=" star_icon fas fa-star"></i>
                    </div>
                    <div className="movie__description">
                      {movie.description}
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>

          <div className=" restaurant__row ">
            <h1 className="favorite__header">
              Restaurants <i className="fas fa-utensils"></i>
            </h1>
            <button
              className="favorites__refresh sub__faveRestaurant"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFood"
              aria-expanded="false"
              aria-controls="collapseFood"
            >
              See the list of favorite restaurants
            </button>
            <div className="collapse" id="collapseFood">
              {props.foodDatabase.map(food => (
                // Needed for differentiation

                <Fade key={uuidv4()}>
                  <div className="restaurant__SubRow fade-in2" key={food._id}>
                    <div className="movie__title">
                      <i className="fas fa-utensils"></i> {food.name}
                    </div>
                    <div className="movie__rating">Address: {food.address}</div>
                  </div>
                </Fade>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="favorites__placeholder__container container-flex">
          <div className="container flex favorites__placeholder">
            <p className="col-sm-6 col-m-6 col-lg-4 ml-auto mr-auto placeholder__paragraph">
              Hello! It seems like you don't have any favorites yet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
