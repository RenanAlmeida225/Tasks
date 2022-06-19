const router = require('express').Router();

const TasksController = require('../controllers/TasksCrontroller.js');

router
	.route('/')
	.get(TasksController.allTasks)
	.post(TasksController.createTasks);

module.exports = router;
