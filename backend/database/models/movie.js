const mongoose = require("mongoose");

const favoriteMovieSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("FavoriteMovie", favoriteMovieSchema);
