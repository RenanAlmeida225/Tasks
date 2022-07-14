const {compareSync} = require('bcryptjs');

module.exports = function comparePassword(password, hash) {
	if (!compareSync(password, hash)) throw new Error('Password incorret!');
};
