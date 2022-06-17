class Token {
	constructor(jwt) {
		this.jwt = jwt;
	}

	createToken({id, email}) {
		const token = this.jwt.sign({id, email}, process.env.SECRET);
		return token;
	}
}

module.exports = Token;
