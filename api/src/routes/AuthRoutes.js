const { Router } = require('express');
const AuthCrontoller = require('../controllers/AuthCrontroller.js');

const router = Router();

router.route('/register').post(AuthCrontoller.register);
router.route('/login').post(AuthCrontoller.login);

module.exports = router;
