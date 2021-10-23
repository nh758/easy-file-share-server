const Sequelize = require('sequelize');

module.exports = class BaseModel extends Sequelize.Model {

	static get properties() {
		// default properties
		return {
			id: {
				type: Sequelize.UUID,
				defaultValue: () => {
					return uuid.v4();
				},
				allowNull: false,
				primaryKey: true
			},
			createdAt: {
				type: Sequelize.DATE
			},
			updatedAt: {
				type: Sequelize.DATE
			}
		};
	}

	static init(sequelize) {
		super.init(this.properties, {
			sequelize,
			timestamps: true,
			tableName: this.modelName
		});
	}

	static async createTable(sequelize) {
		let qInterface = sequelize.getQueryInterface();

		let properties = this.properties;

		await qInterface.createTable(this.modelName, properties);
	}
};
