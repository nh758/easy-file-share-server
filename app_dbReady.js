const dotenv = require("dotenv");
const path = require("path");
const dbLoader = require("./loaders/database.js");

// Config
if (process.env.NODE_ENV !== "production") dotenv.config();

(async () => {
	const DB = dbLoader.getDB();
	const timer = (ms) => new Promise(res => setTimeout(res, ms));

	let isDbReady = false;

	do {
		try {
			// Test DB Connection
			await DB.authenticate();
			isDbReady = true;
			console.log("DB is ready");
		}
		catch (err) {
			// DB is not ready yet
			isDbReady = false;
			await timer(3000); // delay 3 seconds
			console.log("Reconnecting DB...");
		}
	} while (!isDbReady)

	// Start here
	require(path.join(__dirname, "app.js"));
})();
