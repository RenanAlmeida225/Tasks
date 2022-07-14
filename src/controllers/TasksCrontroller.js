class TasksController {
	constructor(tasks) {
		this.tasks = tasks;
	}
	async allTasks(userId) {
		if (!userId) throw new Error('Missing param userId!');
		const res = await this.tasks.findAll({where: {userId}});
		return res;
	}

	async getTasksById({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		const res = await this.tasks.findAll({where: {id, userId}});
		return res;
	}

	async createTasks({title, userId}) {
		if (!title) throw new Error('Missing param title!');
		if (!userId) throw new Error('Missing param userId!');
		const res = await this.tasks.create({title, userId});
		return res;
	}

	async updateTasks({title, id, userId}) {
		if (!title) throw new Error('Missing param title!');
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		let res = await this.tasks.update(
			{title: title},
			{where: {id, userId}}
		);
		res = res[0] === 1 ? 'update succeful' : 'falied update!';

		return res;
	}

	async deleteTasks({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		let res = await this.tasks.destroy({where: {id, userId}});
		res = res === 1 ? 'Delete succesful' : 'Delete failed';
		return res;
	}

	async #isComplete({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		const res = await this.tasks.findOne({where: {id, userId}});
		let complete = res.complete;
		return complete;
	}

	async comleteTasks({id, userId}) {
		if (!id) throw new Error('Missing param id!');
		if (!userId) throw new Error('Missing param userId!');
		let complete = (await this.#isComplete({id, userId})) ? false : true;
		await this.tasks.update({complete}, {where: {id, userId}});
		return `Complete ${complete}`;
	}
}

module.exports = TasksController;
