const AuthService = require("../services/AuthService.js");

module.exports = class AuthRoute {
	static init(app) {

		app.post('/login', async (req, res) => {
			const passcode = req.body.passcode;
			const token = await AuthService.getToken(passcode);

			// valid passcode
			if (token) {
				res.status(200).send(token);
			}
			// invalid
			else {
				res.sendStatus(400);
			}
		});
	}
};
