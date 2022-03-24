const { DataTypes } = require('sequelize');

const db = require('../db/conn.js');

const User = db.define('User', {
	userName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

module.exports = User;
