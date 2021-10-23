const AuthService = require("../services/AuthService.js");

module.exports = async (req, res, next) => {

	let token;

	 if (req.body && req.body.token) {
		token = req.body.token;
	}

	let userInfo = await AuthService.getUserInfo(token);
	if (userInfo) {
		next();
	}
	else {
		res.status(403).json({ message: "Unauthenticated" });
	}
};
