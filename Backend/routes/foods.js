const { Food, validate } = require("../models/food");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const foods = await Food.find().sort("name");
  res.send(foods);
});

router.get("/:id", async (req, res) => {
  const food = await Food.findById(req.params.id);

  if (!food)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(food);
});

module.exports = router;
