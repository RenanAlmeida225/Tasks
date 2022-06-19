const Tasks = require('../models/Tasks.js');

class TasksController {
	static async allTasks(req, res) {
		const { userId } = req.body;
		try {
			const tasks = await Tasks.findAll({ where: { userId: userId } });
			return res.status(200).json({
				tasks
			});
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}

	static async getTasksById(req, res) {
		const { id } = req.params;
		const { userId } = req.body;

		try {
			const tasks = await Tasks.findAll({
				where: { userId: userId, id: id }
			});
			return res.status(200).json({
				tasks
			});
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}

	static async createTasks(req, res) {
		const userId = req.params.userId;
		const title = req.body.title;

		if (!userId) {
			return res.status(422).json({
				error: 'User id is requeired!'
			});
		}

		if (!title) {
			return res.status(422).json({
				error: 'Title is requeired!'
			});
		}

		try {
			const tasks = await Tasks.create({ title: title, userId: userId });

			return res.status(201).json({
				message: 'User created successfullyr!',
				tasks
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error: error
			});
		}
	}
}

module.exports = TasksController;
