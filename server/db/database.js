const Sequelize = require("sequelize");

const db = new Sequelize(
	"postgres://localhost:5432/reactPractice_login", 
	{ 
		logging: false
	}
);

module.exports = db;