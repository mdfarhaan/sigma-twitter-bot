const express = require("express");
const router = express.Router();
const { checkTweet } = require("./controller");

router.get("/", async (req, res) => {
  const { url } = req.body;

  const response = await checkTweet(url);

  res.status(200).send(response);
});

module.exports = router;
