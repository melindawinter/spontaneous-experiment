const express = require("express");
const router = express.Router();
const FavoriteFood = require("../database/models/food");


router.get("/", async (req, res) => {
  try {
    const favorite__food = await FavoriteFood.find();
    res.json(favorite__food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const favorite__food = new FavoriteFood({
    name: req.body.name,
    address: req.body.address
  });

  try {
    // Persist the new favmovie in db
    const newFavoriteFood = await favorite__food.save();
    res.status(201).json(newFavoriteFood);
  } catch (err) {
    // If something is wrong with the data that the user gave us.
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
