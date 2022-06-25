const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
	const authHeaders = req.headers['authorization'];
	const token = authHeaders.replace('Bearer ', '');

	try {
		if (!token) throw new Error('Missing param token');
		jwt.verify(token, process.env.SECRET);
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
}

module.exports = verifyToken;
