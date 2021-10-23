const jwt = require("jwt-simple");

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

		const user = null;
		// TODO: find the user info from DB
		// const user = await User.findOne({
		// 	where: { id: id }
		// });

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


		const user = null;
		// TODO : get the user info from DB
		// const user = await User.findOne({
		// 	where: { passcode: passcode }
		// });

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
}
