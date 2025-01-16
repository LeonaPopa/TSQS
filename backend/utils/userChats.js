const userChats = {};

const initializeUser = (userId) => {
  if (!userChats[userId]) {
    userChats[userId] = [];
  }
};

module.exports = { userChats, initializeUser };
