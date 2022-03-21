module.exports = class AuthCrontoller {
	static async login(req, res) {
		res.status(200).json({
			message: 'ok',
		});
	}

	static async register(req, res) {
		res.status(200).json({
			message: 'ok',
		});
	}
};
