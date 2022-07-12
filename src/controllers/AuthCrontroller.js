const ModelRepository = require('../repositories/ModelRepository');
const User = require('../models/User');
const comparePassword = require('../helpers/comparePassword');

const modelRepository = new ModelRepository(User);

class AuthCrontoller {
	async register({userName, email, password}) {
		if (!userName) throw new Error('Missing param userName!');
		if (!email) throw new Error('Missing param email!');
		if (!password) throw new Error('Missing param password!');
		const res = await modelRepository.save({
			userName: userName,
			email: email,
			password: password
		});
		return res;
	}

	async login({email, password}) {
		if (!email) throw new Error('Missing param email!');
		if (!password) throw new Error('Missing param password!');
		const res = await modelRepository.findOne({email: email});
		if (!res) throw new Error('User not found!');
		comparePassword(password, res.password);
		return res;
	}
}

module.exports = new AuthCrontoller();
