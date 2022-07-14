const router = require('express').Router();
const AuthCrontoller = require('../controllers/AuthCrontroller.js');
const genHash = require('../helpers/genHash');
const genToken = require('../helpers/genToken');

const authCrontoller = new AuthCrontoller(require('../models/User'));

router.route('/register').post(async (req, res) => {
	const {userName, email, password} = req.body;
	try {
		const user = await authCrontoller.register({
			userName,
			email,
			password: genHash(password)
		});
		return res
			.status(200)
			.json({user, token: genToken({id: user.id, email: user.email})});
	} catch (error) {
		return res.status(400).json({error: error.message});
	}
});
router.route('/login').post(async (req, res) => {
	const {email, password} = req.body;
	try {
		const user = await authCrontoller.login({email, password});
		return res
			.status(200)
			.json({user, token: genToken({id: user.id, email: user.email})});
	} catch (error) {
		return res.status(400).json({error: error.message});
	}
});

module.exports = router;
