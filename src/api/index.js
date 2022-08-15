const express = require("express");
const router = express.Router();
const LikeHandler = require("./LikeHandler/router");
const RetweetHandler = require("./RetweetHandler/router");
const FollowHandler = require("./FollowingHandler/router");
const TweetHandler = require("./TweetHandler/router");

router.use("/like", LikeHandler);
router.use("/retweet", RetweetHandler);
router.use("/following", FollowHandler);
router.use("/tweet", TweetHandler);

module.exports = router;
