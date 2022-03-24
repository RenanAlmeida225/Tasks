const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('apptasks', 'root', '', {
	dialect: 'mysql',
	host: 'localhost',
});

try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error(`Unable to connect to the database: ${error}`);
}

module.exports = sequelize;
