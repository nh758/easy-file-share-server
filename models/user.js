const Sequelize = require('sequelize');
const uuid = require('uuid');

const BaseModel = require("./_base.js");

module.exports = class UserModel extends BaseModel {
	static get modelName() {
		return "user";
	}

	static get properties() {
		const props = {
			id: {
				type: Sequelize.UUID,
				defaultValue: () => {
					return uuid.v4();
				},
				allowNull: false,
				primaryKey: true
			},
			passcode: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			folderName: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
				
			}
		};

		return Object.assign(super.properties, props);
	}
};
