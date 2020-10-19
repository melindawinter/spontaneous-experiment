const mongoose = require("mongoose");

const favoriteFoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("FavoriteFood", favoriteFoodSchema);
