class Cryptography {
	constructor(bcrypt) {
		this.bcrypt = bcrypt;
	}
	genHash(password) {
		const salt = this.bcrypt.genSaltSync(10);
		const hashPassword = this.bcrypt.hashSync(password, salt);
		return hashPassword;
	}

	comparePassword({password, hash}) {
		const passwordHash = this.bcrypt.compareSync(password, hash);
		return passwordHash;
	}
}

module.exports = Cryptography;
