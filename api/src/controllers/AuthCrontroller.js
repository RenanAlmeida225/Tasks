const User = require('../models/User.js');

const AuthCrontoller = {
	async register(req, res) {
		const { userName, email, password, passwordConfirmation } = req.body;

		// Validações
		//#region
		if (!userName) {
			return res.status(422).json({
				error: 'User name is requeired!',
			});
		}

		// Validações de email
		if (!email) {
			return res.status(422).json({
				error: 'Email is requeired!',
			});
		}

		if (!email.match('@') && !email.match('.com')) {
			return res.status(422).json({
				error: 'Email must contain "@" and ."com"!',
			});
		}

		// Validação de email existente
		const userExists = await User.findOne({ where: { email: email } });

		if (userExists) {
			return res.status(422).json({
				error: 'Email is already in use, try another!',
			});
		}

		// Validações de senhas
		if (!password) {
			return res.status(422).json({
				error: 'password is requeired!',
			});
		}

		if (!passwordConfirmation) {
			return res.status(422).json({
				error: 'password is requeired!',
			});
		}

		if (password.length < 8) {
			return res.status(422).json({
				error: 'password must contain at least 8 characters!',
			});
		}

		if (password !== passwordConfirmation) {
			return res.status(422).json({
				error: 'password and password confirmation do not match!',
			});
		}

		//#endregion

		console.log({ userName, email, password, passwordConfirmation });
	},

	async login(req, res) {
		res.status(200).json({
			message: 'ok',
		});
	},
};

module.exports = AuthCrontoller;
