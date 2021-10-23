const AuthService = require("../services/AuthService.js");

module.exports = async (req, res, next) => {
  let token;

  if (req.headers && req.headers.token) {
    token = req.headers.token;
  }

  let userInfo = await AuthService.getUserInfo(token);
  if (userInfo) {
    next();
  } else {
    res.status(403).json({ message: "Unauthenticated" });
  }
};
