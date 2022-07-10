const ModelRepository = require('./ModelRepository');
const User = require('../models/User');

class UserRepository extends ModelRepository {
	static async findOne(data) {
		const res = await User.findOne({where: data});
		return res;
	}
	static async save(data) {
		const res = await User.create(data);
		return res;
	}
}

module.exports = UserRepository;
