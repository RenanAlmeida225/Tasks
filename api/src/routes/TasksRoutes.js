const router = require('express').Router();

const TasksController = require('../controllers/TasksCrontroller.js');
const verifyToken = require('../helpers/verifyToken');

router
	.route('/')
	.get(verifyToken, TasksController.allTasks)
	.post(verifyToken, TasksController.createTasks);

router
	.route('/:id')
	.get(verifyToken, TasksController.getTasksById)
	.put(verifyToken, TasksController.updateTasks)
	.delete(verifyToken, TasksController.deleteTasks);

router.get('/complete/:id', verifyToken, TasksController.comleteTasks);

module.exports = router;
