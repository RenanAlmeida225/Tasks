const router = require('express').Router();
const TasksController = require('../controllers/TasksCrontroller.js');
const verifyToken = require('../helpers/verifyToken');
const getUserByToken = require('../helpers/getUserByToken');

const tasksController = new TasksController(require('../models/Tasks'));
router
	.route('/')
	.get(verifyToken, async (req, res) => {
		try {
			const tasks = await tasksController.allTasks(getUserByToken(req));
			return res.status(200).json({tasks});
		} catch (error) {
			return res.status(400).json({error: error.message});
		}
	})
	.post(verifyToken, async (req, res) => {
		const {title} = req.body;
		try {
			const task = await tasksController.createTasks({
				title,
				userId: getUserByToken(req)
			});
			return res.status(200).json({task});
		} catch (error) {
			return res.status(400).json({error: error.message});
		}
	});

router
	.route('/:id')
	.get(verifyToken, async (req, res) => {
		const {id} = req.params;
		try {
			const task = await tasksController.getTasksById({
				id,
				userId: getUserByToken(req)
			});
			return res.status(200).json({task});
		} catch (error) {
			return res.status(400).json({error: error.message});
		}
	})
	.put(verifyToken, async (req, res) => {
		const {id} = req.params;
		const {title} = req.body;
		try {
			const task = await tasksController.updateTasks({
				title,
				id,
				userId: getUserByToken(req)
			});
			return res.status(200).json({task});
		} catch (error) {
			return res.status(400).json({error: error.message});
		}
	})
	.delete(verifyToken, async (req, res) => {
		const {id} = req.params;
		try {
			const task = await tasksController.deleteTasks({
				id: parseInt(id),
				userId: getUserByToken(req)
			});
			return res.status(200).json({task});
		} catch (error) {
			return res.status(400).json({error: error.message});
		}
	});
router.put('/complete/:id', verifyToken, async (req, res) => {
	const {id} = req.params;
	try {
		const task = await tasksController.comleteTasks({
			id: parseInt(id),
			userId: getUserByToken(req)
		});
		return res.status(200).json({task});
	} catch (error) {
		return res.status(400).json({error: error.message});
	}
});

module.exports = router;
