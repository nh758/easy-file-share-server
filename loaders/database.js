const dotenv = require('dotenv');
const fs = require('fs');

const { Sequelize } = require('sequelize');

if (process.env.NODE_ENV !== 'production') dotenv.config();
module.exports = class DatabaseLoader {
	static init() {
		// Config Database here.
		const sequelize = new Sequelize(
			process.env.DB_NAME,
			process.env.DB_USER,
			process.env.DB_PASSWORD,
			{
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				dialect: process.env.DB_DIALECT,
				define: {
					timestamps: false
				}
			}
		);
		
		this.db = { sequelize, Sequelize };
		
		fs.readdir("./models", (err, files) => {
			if(err) {
				console.log(err);
			}
			else {
				files.forEach((e, i) => {
					this.db[`${e.replace(".js", '')}`] = require(`../models/${e}`)( sequelize , Sequelize );
				});
			}
		});
	}

	static models() {
		
	}
};