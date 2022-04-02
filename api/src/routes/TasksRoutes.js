const router = require('express').Router();

const TasksController = require('../controllers/TasksCrontroller.js');

router.route('/').get(TasksController.allTasks);
router.route('/createTasks/:userId').post(TasksController.createTasks);
router
	.route('/createObjectives/:tasksId')
	.post(TasksController.createObjectives);

module.exports = router;
