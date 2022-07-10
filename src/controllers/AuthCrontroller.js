const UserRepository = require('../repositories/UserRepository');
const comparePassword = require('../helpers/comparePassword');

class AuthCrontoller {
	async register({userName, email, password}) {
		if (!userName) throw new Error('Missing param userName!');
		if (!email) throw new Error('Missing param email!');
		if (!password) throw new Error('Missing param password!');
		const user = await UserRepository.save({
			userName: userName,
			email: email,
			password: password
		});
		return user;
	}

	async login({email, password}) {
		if (!email) throw new Error('Missing param email!');
		if (!password) throw new Error('Missing param password!');
		const user = await UserRepository.findOne({email: email});
		if (!user) throw new Error('User not found!');
		comparePassword(password, user.password);
		return user;
	}
}

module.exports = new AuthCrontoller();
