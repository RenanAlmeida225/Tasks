const getUserByToken = require('../helpers/getUserByToken.js');
const Tasks = require('../models/Tasks.js');

class TasksController {
	static async allTasks(req, res) {
		const userId = getUserByToken(req);
		try {
			const tasks = await Tasks.findAll({ where: { userId: userId } });
			return res.status(200).json({
				tasks
			});
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}

	//teste

	static async getTasksById(req, res) {
		const { id } = req.params;
		const userId = getUserByToken(req);

		try {
			const tasks = await Tasks.findAll({
				where: { userId: userId, id: id }
			});
			return res.status(200).json({ tasks });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}

	static async createTasks(req, res) {
		const { title } = req.body;
		const userId = getUserByToken(req);

		try {
			if (!title) throw new Error('Missing param title!');
			const tasks = await Tasks.create({ title: title, userId: userId });
			return res.status(201).json({ tasks });
		} catch (error) {
			return res.status(500).json({
				error: error.message
			});
		}
	}

	static async updateTasks(req, res) {
		const { id } = req.params;
		const { title } = req.body;
		const userId = getUserByToken(req);

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

	static async deleteTasks(req, res) {
		const { id } = req.params;
		const userId = getUserByToken(req);
		try {
			const task = await Tasks.destroy({
				where: { userId: userId, id: id }
			});
			return res.status(200).json({ task });
		} catch (error) {
			return res.status(400).json({ error: error.message });
		}
	}

	static async comleteTasks(req, res) {
		const { id } = req.params;
		const userId = getUserByToken(req);
		let complete;

		try {
			complete = (await isComplete(id, userId)) ? false : true;
			await Tasks.update(
				{ complete },
				{
					where: { userId: userId, id: id }
				}
			);
			return res.status(200).json({ complete });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ error: error.message });
		}
	}
}

isComplete = async (id, userId) => {
	const task = await Tasks.findOne({
		where: { userId: userId, id: id }
	});
	const complete = task.complete;
	return complete;
};

module.exports = TasksController;
