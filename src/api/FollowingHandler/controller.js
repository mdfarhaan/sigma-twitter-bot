const axios = require("axios");
const { config } = require("../../utils/axiosConfig");

exports.checkFollowing = async (username, accountName) => {
  const userId = await getUserId(username);

  const getInitialFollowingInfo = await axios
    .get(`https://api.twitter.com/2/users/${userId}/following`, config)
    .then((res) => res.data);

  const { data, meta } = getInitialFollowingInfo;

  const userFollows = data.some((user) => user.username === accountName);
  if (!userFollows) {
    const navigator = await navigateTweets(
      userId,
      accountName,
      meta.next_token,
      username
    );
    return navigator;
  } else {
    return {
      success: true,
      message: "User follows the account",
      accountName,
      username,
    };
  }
};

const navigateTweets = async (userId, accountName, next, username) => {
  try {
    const getInitialFollowingInfo = await axios
      .get(
        `https://api.twitter.com/2/users/${userId}/following?pagination_token=${next}`,
        config
      )
      .then((res) => res.data);

    const { data, meta } = getInitialFollowingInfo;

    if (meta?.next_token) {
      const userFollows = data.some((user) => user.username === accountName);
      if (userFollows) {
        return {
          success: true,
          message: "User follows the account",
          accountName,
          username,
        };
      } else {
        const navigator = await navigateTweets(
          userId,
          accountName,
          meta.next_token,
          username
        );
        return navigator;
      }
    } else {
      return {
        success: false,
        message: "User does not follows the account",
        tweetId,
        username,
      };
    }
  } catch (err) {
    return err;
  }
};

const getUserId = async (username) => {
  try {
    const userInfo = await axios
      .get(`https://api.twitter.com/2/users/by/username/${username}`, config)
      .then((res) => res.data);
    return userInfo.data.id;
  } catch (err) {
    return err;
  }
};
