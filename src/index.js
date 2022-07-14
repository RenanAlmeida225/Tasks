require('dotenv').config();
const express = require('express');
const cors = require('cors');
console.log(process.env.DB_DIALECT);
const conn = require('./db/conn');
const AuthRoutes = require('./routes/AuthRoutes.js');
const TasksRoutes = require('./routes/TasksRoutes.js');

const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/auth', AuthRoutes);
app.use('/api/tasks', TasksRoutes);

conn.sync({force: false})
	.then(app.listen(port, () => console.log(`Open on port ${port}!`)))
	.catch(error => console.error(error));
