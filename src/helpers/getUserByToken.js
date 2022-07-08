const { verify } = require('jsonwebtoken');

function getUserByToken(req) {
	const authHeaders = req.headers['authorization'];
	const token = authHeaders.replace('Bearer ', '');
	const decoded = verify(token, process.env.SECRET);
	return decoded.id;
}

module.exports = getUserByToken;
