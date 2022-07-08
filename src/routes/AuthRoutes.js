const router = require('express').Router();
const AuthCrontoller = require('../controllers/AuthCrontroller.js');

router.route('/register').post(AuthCrontoller.register);
router.route('/login').post(AuthCrontoller.login);

module.exports = router;
