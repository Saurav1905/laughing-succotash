const { User } = require("../models/users");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password.");
  //   payload first    digital signature
  const token = user.generateAuthToken();

  res.send(token);
});
function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(250).required().email(),
    password: Joi.string().min(5).max(250).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
