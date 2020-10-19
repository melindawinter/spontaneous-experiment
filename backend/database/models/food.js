const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const favoriteFoodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const favoriteFood = mongoose.model("FavoriteFood", favoriteFoodSchema);

module.exports = favoriteFood;
