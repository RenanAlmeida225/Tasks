class ModelRepository {
	constructor() {
		if (this.constructor == ModelRepository) {
			throw new Error('Object of Abstract Class cannot be created');
		}
	}

	static async findAll() {
		throw new Error('Abstract Method has no implementation');
	}

	static async findOne(data) {
		throw new Error('Abstract Method has no implementation');
	}

	static async save(data) {
		throw new Error('Abstract Method has no implementation');
	}

	static async update(data) {
		throw new Error('Abstract Method has no implementation');
	}
	static async delete(data) {
		throw new Error('Abstract Method has no implementation');
	}
}

module.exports = ModelRepository;
