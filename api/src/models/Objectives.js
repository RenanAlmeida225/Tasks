const { DataTypes } = require('sequelize');

const db = require('../db/conn.js');
const Tasks = require('./Tasks.js');

const Objectives = db.define('Objectives', {
	contents: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	complete: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
});

Objectives.belongsTo(Tasks);
Tasks.hasMany(Objectives);

module.exports = Objectives;
