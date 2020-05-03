const Sequelize = require("sequelize");

const db = new Sequelize(
	"postgresql://localhost:5432/devdrums", 
	{
		logging: false
	}
);

module.exports = db;

