const { DataTypes } = require('sequelize');

const db = require('../db/conn.js');

const Tasks = db.define('Tasks', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	complete: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
});

module.exports = Tasks;
