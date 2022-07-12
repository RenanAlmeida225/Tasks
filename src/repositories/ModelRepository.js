const Tasks = require('../models/Tasks');
class ModelRepository {
	constructor(model) {
		this.model = model;
	}

	async findAll(data) {
		const res = await this.model.findAll({where: data});
		return res;
	}

	async findOne(data) {
		const res = await this.model.findOne({where: data});
		return res;
	}

	async save(data) {
		const res = await this.model.create(data);
		return res;
	}

	async update(objt, data) {
		const res = await Tasks.update(objt, {where: data});
		return res;
	}

	async delete(data) {
		const res = await this.model.destroy({where: data});
		return res;
	}
}

module.exports = ModelRepository;
