const bcrypt = require('bcryptjs');

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

		if (!email.match('@') || !email.match('.com')) {
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
				error: 'Password is requeired!',
			});
		}

		if (password.length < 8) {
			return res.status(422).json({
				error: 'Password must contain at least 8 characters!',
			});
		}

		if (!passwordConfirmation) {
			return res.status(422).json({
				error: 'Password confirmation is requeired!',
			});
		}

		if (password !== passwordConfirmation) {
			return res.status(422).json({
				error: 'Password and password confirmation do not match!',
			});
		}
		//#endregion

		const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(password, salt);

		try {
			const user = await User.create({
				userName: userName,
				email: email,
				password: hashPassword,
			});

			return res.status(201).json({
				message: 'User created successfullyr!',
				user,
			});
		} catch (error) {
			res.status(500).json({
				error,
			});
		}
	},

	async login(req, res) {
		res.status(200).json({
			message: 'ok',
		});
	},
};

module.exports = AuthCrontoller;
