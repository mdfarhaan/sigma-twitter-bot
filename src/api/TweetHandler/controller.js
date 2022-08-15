const axios = require("axios");
const { config } = require("../../utils/axiosConfig");

exports.checkTweet = async (url) => {
  const { username, tweetId } = extractInfo(url);

  const getTweetInfo = await axios
    .get(`https://api.twitter.com/2/tweets/${tweetId}`, config)
    .then((res) => res.data);

  const { data } = getTweetInfo;
  if (data) {
    return {
      success: true,
      text: data.text,
      tweetId,
      username,
    };
  } else {
    return {
      success: false,
      message: "Tweet not found! Invalid tweet ID",
    };
  }
};

const extractInfo = (url) => {
  const regex = /https:\/\/twitter\.com\/(.*)\/status\/([0-9]*)/;
  const match = url.match(regex);
  return {
    username: match[1],
    tweetId: match[2],
  };
};
