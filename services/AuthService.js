const jwt = require("jwt-simple");
const UserModel = require("../models/user.js");

module.exports = class AuthService {
	/**
	 * @method getUserInfo
	 * 
	 * @param {string} - token
	 * @return {Object} - UserInfo
	 */
	static async getUserInfo(token) {
		if (!token) return;

		const payload = jwt.decode(token, process.env.JWT_SECRET);
		const id = payload.sub;

		// find the user info from DB
		const user = await UserModel.findOne({
			where: { id: id }
		});

		if (!user) return;

		return user.toJSON();
	}

	/**
	 * @method getToken
	 * 
	 * @param {string} - passcode
	 *
	 * @return {?string} token
	 */
	static async getToken(passcode) {
		if (!passcode) return;

		// get the user info from DB
		const user = await UserModel.findOne({
			where: { passcode: passcode }
		});

		// Invalid
		if (!user) return;

		const userData = user.toJSON();

		// Valid
		const payload = {
			sub: userData.id,
			iat: new Date().getTime() // issue at time
		};

		return jwt.encode(payload, process.env.JWT_SECRET);
	}
};
