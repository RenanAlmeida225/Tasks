const { Router } = require('express');
const AuthCrontoller = require('../controllers/AuthCrontroller.js');

const router = Router();

router.route('/login').post(AuthCrontoller.login);
router.route('/register').post(AuthCrontoller.register);

module.exports = router;
