const dotenv = require('dotenv');
const fs = require('fs');

const { Sequelize } = require('sequelize');

const UserModel = require("../models/user.js")

module.exports = class DatabaseLoader {
	static getDB() {
		if (this.db == null) {
			const sequelize = new Sequelize(
				process.env.DB_NAME,
				process.env.DB_USER,
				process.env.DB_PASSWORD,
				{
					host: process.env.DB_HOST,
					port: process.env.DB_PORT,
					dialect: 'mysql'
				}
			);

			this.db = sequelize;
		}

		return this.db;
	}

	static init() {
		// Config Database here.
		this.getDB();

		// fs.readdir("./models", (err, files) => {
		// 	if (err) {
		// 		console.log(err);
		// 	}
		// 	else {
		// 		files.forEach((e, i) => {
		// 			this.db[`${e.replace(".js", '')}`] = require(`../models/${e}`)(sequelize, Sequelize);
		// 		});
		// 	}
		// });
		this.models();
	}

	static models() {
		UserModel.init(this.db);

		UserModel.createTable(this.db);
	}
};