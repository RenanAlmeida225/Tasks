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
		const { title, userId } = req.body;

		try {
			if (!title) throw new Error('Missing param title!');
			const tasks = await Tasks.create({ title: title, userId: userId });
			return res.status(201).json({
				tasks
			});
		} catch (error) {
			return res.status(500).json({
				error: error.message
			});
		}
	}

	static async updateTasks(req, res) {
		const { id } = req.params;
		const { title, userId } = req.body;

		try {
			const task = await Tasks.update(
				{ title },
				{ where: { userId: userId, id: id } }
			);
			return res.status(200).json({ task });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}
}

module.exports = TasksController;
