const bcrypt = require('bcryptjs');

module.exports = function genHash(password) {
	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};
