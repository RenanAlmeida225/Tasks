const User = require('../models/User.js');

const genHash = require('../helpers/genHash');
const genToken = require('../helpers/genToken');
const comparePassword = require('../helpers/comparePassword');

class AuthCrontoller {
	static async register(req, res) {
		const { userName, email, password } = req.body;

		try {
			if (!userName) throw new Error('Missing param userName!');

			if (!email) throw new Error('Missing param email!');

			if (!password) throw new Error('Missing param password!');

			const user = await User.create({
				userName: userName,
				email: email,
				password: genHash(password)
			});

			return res.status(201).json({
				user,
				token: genToken({ id: user.id, email: user.email })
			});
		} catch (error) {
			res.status(400).json({
				error: error.message
			});
		}
	}

	static async login(req, res) {
		const { email, password } = req.body;

		try {
			if (!email) throw new Error('Missing param email!');

			if (!password) throw new Error('Missing param password!');

			const user = await User.findOne({ where: { email: email } });

			if (!user) throw new Error('User not found!');

			comparePassword(password, user.password);

			return res.status(200).json({
				user,
				token: genToken({ id: user.id, email: user.email })
			});
		} catch (error) {
			res.status(400).json({
				error: error.message
			});
		}
	}
}

module.exports = AuthCrontoller;
