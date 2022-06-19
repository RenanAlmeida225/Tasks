const jwt = require('jsonwebtoken');

module.exports = function createToken({ id, email }) {
	const token = jwt.sign({ id, email }, process.env.SECRET);
	return token;
};
