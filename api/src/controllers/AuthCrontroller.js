const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User.js');

const createToken = ({ id, email }) => {
	const token = jwt.sign({ id, email }, process.env.SECRET, {
		expiresIn: 60 * 5,
	});

	return token;
};

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

			const token = createToken({ id: user.id, email: user.email });

			return res.status(201).json({
				message: 'User created successfullyr!',
				user,
				token,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: error,
			});
		}
	},

	async login(req, res) {
		const { email, password } = req.body;

		// Validações
		//#region
		//email
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

		// Se o usuario existe no banco de dados
		const user = await User.findOne({ where: { email: email } });

		if (!user) {
			return res.status(422).json({
				error: 'User not found!',
			});
		}

		//senha
		if (!password) {
			return res.status(422).json({
				error: 'Password is requeired!',
			});
		}

		if (!bcrypt.compareSync(password, user.password)) {
			return res.status(422).json({
				error: 'Incorrect password!',
			});
		}
		//#endregion

		try {
			const token = createToken({ id: user.id, email: user.email });

			return res.status(200).json({
				message: 'Login successfully!',
				user,
				token,
			});
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: error,
			});
		}
	},
};

module.exports = AuthCrontoller;
