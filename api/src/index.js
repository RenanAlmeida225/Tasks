const express = require('express');
const conn = require('./db/conn.js');
const cors = require('cors');
require('dotenv').config();

// Importando as rotas
const AuthRoutes = require('./routes/AuthRoutes.js');
const TasksRoutes = require('./routes/TasksRoutes.js');

const port = process.env.PORT || 5000;

const app = express();

// Configurando o Cors
app.use(
	cors({
		origin: process.env.URL_CLIENT || 'http://localhost:3000',
		optionsSuccessStatus: 200,
	})
);

// Configurando o json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/authentication', AuthRoutes);
app.use('/api/tasks', TasksRoutes);

//{ alter: true }{ force: true }
conn.sync({ force: true })
	.then(app.listen(port, () => console.log(`Open on port ${port}!`)))
	.catch(error => console.error(error));
