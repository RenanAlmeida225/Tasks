const ModelRepository = require('../repositories/ModelRepository');
const Tasks = require('../models/Tasks');

const modelRepository = new ModelRepository(Tasks);

class TasksController {
	async allTasks(userId) {
		if (!userId) throw new Error('Missing param userId!');
		const res = await modelRepository.findAll({userId});
		return res;
	}

	async getTasksById({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		const res = await modelRepository.findAll({id, userId});
		return res;
	}

	async createTasks({title, userId}) {
		if (!title) throw new Error('Missing param title!');
		if (!userId) throw new Error('Missing param userId!');
		const res = await modelRepository.save({title, userId});
		return res;
	}

	async updateTasks({title, id, userId}) {
		if (!title) throw new Error('Missing param title!');
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		let res = await modelRepository.update({title: title}, {id, userId});
		res = res[0] === 1 ? 'update succeful' : 'falied update!';

		return res;
	}

	async deleteTasks({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		let res = await modelRepository.delete({id, userId});
		res = res === 1 ? 'Delete succesful' : 'Delete failed';
		return res;
	}

	async #isComplete({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		const res = await modelRepository.findOne({id, userId});
		let complete = res.complete;
		return complete;
	}

	async comleteTasks({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		let complete = (await this.#isComplete({id, userId})) ? false : true;
		await modelRepository.update({complete}, {id, userId});
		return `Complete ${complete}`;
	}
}

module.exports = new TasksController();
