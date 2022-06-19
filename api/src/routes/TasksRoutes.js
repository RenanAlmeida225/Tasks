const router = require('express').Router();

const TasksController = require('../controllers/TasksCrontroller.js');

router
	.route('/')
	.get(TasksController.allTasks)
	.post(TasksController.createTasks);

router.route('/:id').get(TasksController.getTasksById);

module.exports = router;
