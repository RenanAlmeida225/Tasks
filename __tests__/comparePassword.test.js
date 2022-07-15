const bcrypt = require('bcryptjs');
const comparePassword = require('../src/helpers/comparePassword');
jest.mock('bcryptjs');

test('should return error Password incorret!', () => {
	bcrypt.compareSync.mockResolvedValue(false);
	try {
		comparePassword('teste123', 'hash');
	} catch (error) {
		expect(error.messge).toEqaul('Password incorret!');
	}
});

test('should return undefined', () => {
	bcrypt.compareSync.mockResolvedValue(true);
	expect(comparePassword('teste123', 'hash')).toBe(undefined);
});
