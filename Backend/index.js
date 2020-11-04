const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const comment = require("./routes/comment");
const food = require("./routes/foods");
const users = require("./routes/users");
const express = require("express");
const app = express();
// movie food
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB..."));

app.use(express.json());
app.use("/api/comment", comment);
app.use("/api/food", food);
app.use("/api/users", users);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
