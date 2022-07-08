const { DataTypes } = require('sequelize');

const sequelize = require('../db/conn.js');
const User = require('./User.js');

const Tasks = sequelize.define('Tasks', {
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

User.hasMany(Tasks, { foreignKey: 'userId' });
Tasks.belongsTo(User, { foreignKey: 'userId' });

module.exports = Tasks;
