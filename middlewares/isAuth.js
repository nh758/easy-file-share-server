const AuthService = require("../services/AuthService.js");

module.exports = async (req, res, next) => {
  let token;

  if (req.headers && req.headers.token) {
    token = req.headers.token;
  }

  let userInfo;

  try {
    userInfo = await AuthService.getUserInfo(token);
  } catch (e) {
    return res.status(403).json({ message: e.message });
  }

  if (userInfo) {
    next();
  } else {
    res.status(403).json({ message: "Unauthenticated" });
  }
};
