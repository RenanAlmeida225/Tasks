const comparePassword = require('../helpers/comparePassword');

class AuthCrontoller {
	constructor(user) {
		this.user = user;
	}

	async register({userName, email, password}) {
		if (!userName) throw new Error('Missing param userName!');
		if (!email) throw new Error('Missing param email!');
		if (!password) throw new Error('Missing param password!');
		const res = await this.user.create({
			userName: userName,
			email: email,
			password: password
		});
		return res;
	}

	async login({email, password}) {
		if (!email) throw new Error('Missing param email!');
		if (!password) throw new Error('Missing param password!');
		const res = await this.user.findOne({where: {email: email}});
		if (!res) throw new Error('User not found!');
		comparePassword(password, res.password);
		return res;
	}
}

module.exports = AuthCrontoller;
