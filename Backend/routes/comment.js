const { Comment, validate } = require("../models/comment");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let comment = new Comment({ name: req.body.name });
  comment = await comment.save();

  res.send(comment);
});
router.get("/:id", async (req, res) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment)
    return res.status(404).send("The comment with the given ID was not found.");

  res.send(comment);
});

module.exports = router;
