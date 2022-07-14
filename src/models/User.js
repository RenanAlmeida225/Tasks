const {DataTypes} = require('sequelize');
const sequelize = require('../db/conn.js');

const User = sequelize.define('User', {
	userName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = User;
