const Sequelize = require("sequelize");
const db = require("./database");

const User = db.define("user", {
	userName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	firstName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false,
	},
});

module.exports = User;
