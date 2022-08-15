const { constants } = require("./constants");

exports.config = {
  headers: {
    Authorization: `Bearer ${constants.TOKEN}`,
  },
};
