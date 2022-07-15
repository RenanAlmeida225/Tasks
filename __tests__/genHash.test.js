const bcrypt = require('bcryptjs');
const genHash = require('../src/helpers/genHash');
jest.mock('bcryptjs');

test('should return new hash', () => {
	const res = 'hash';
	bcrypt.genSaltSync.mockResolvedValue('salt');
	bcrypt.hashSync.mockResolvedValue(res);
	genHash('teste123').then(response => {
		expect(response).toBe(res);
	});
});
