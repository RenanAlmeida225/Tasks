const { DataTypes } = require('sequelize');

const db = require('../db/conn.js');
const User = require('./User.js');

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

Tasks.belongsTo(User);
User.hasMany(Tasks);

module.exports = Tasks;
