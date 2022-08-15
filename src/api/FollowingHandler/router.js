const express = require("express");
const router = express.Router();
const { checkFollowing } = require("./controller");

router.get("/", async (req, res) => {
  const { username, accountName } = req.query;

  const response = await checkFollowing(username, accountName);

  res.status(200).send(response);
});

module.exports = router;
