const Tasks = require('../models/Tasks.js');

const TasksController = {
	async allTasks(req, res) {
		res.status(200).json({
			message: 'ok',
		});
	},

	async createTasks(req, res) {
		const userId = req.params.userId;
		const title = req.body.title;

		if (!userId) {
			return res.status(422).json({
				error: 'User id is requeired!',
			});
		}

		if (!title) {
			return res.status(422).json({
				error: 'title is requeired!',
			});
		}

		try {
			const tasks = await Tasks.create({ title: title, userId: userId });

			return res.status(201).json({
				message: 'User created successfullyr!',
				tasks,
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error: error,
			});
		}
	},
};

module.exports = TasksController;
