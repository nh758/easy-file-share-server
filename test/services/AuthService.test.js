const assert = require("assert");
const sinon = require("sinon");

const AuthService = require("../../services/AuthService.js");

describe("AuthService", function () {

	it(".getUserInfo - should return null when token is empty", async function () {
		const token = "";

		const result = await AuthService.getUserInfo(token);

		assert.equal(null, result);
	});

});
