const express = require("express");
const router = express.Router();
const { checkRetweet } = require("./controller");

router.get("/", async (req, res) => {
  const { username, tweetId } = req.query;

  const response = await checkRetweet(username, tweetId);

  res.status(200).send(response);
});

module.exports = router;
