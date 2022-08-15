const axios = require("axios");
const { config } = require("../../utils/axiosConfig");

exports.checkLike = async (username, tweetId) => {
  const getInitialTweetInfo = await axios
    .get(`https://api.twitter.com/2/tweets/${tweetId}/liking_users`, config)
    .then((res) => res.data);

  const { data, meta } = getInitialTweetInfo;
  const userLikes = data.some((user) => user.username === username);
  if (!userLikes) {
    const navigator = await navigateTweets(tweetId, username, meta.next_token);
    return navigator;
  } else {
    return {
      success: true,
      message: "User has liked the tweet",
      tweetId,
      username,
    };
  }
};

const navigateTweets = async (tweetId, username, next) => {
  try {
    const tweetInfo = await axios
      .get(
        `https://api.twitter.com/2/tweets/${tweetId}/liking_users?max_results=100&pagination_token=${next}`,
        config
      )
      .then((res) => res.data);
    const { data, meta } = tweetInfo;

    if (meta.result_count !== 0) {
      const userLikes = data.some((user) => user.username === username);
      if (userLikes) {
        return {
          success: true,
          message: "User has liked the tweet",
          tweetId,
          username,
        };
      } else {
        const navigator = await navigateTweets(
          tweetId,
          username,
          meta.next_token
        );
        return navigator;
      }
    } else {
      return {
        success: false,
        message: "User has not liked the tweet",
        tweetId,
        username,
      };
    }
  } catch (err) {
    return err;
  }
};
