const jwt = require('jsonwebtoken');
const genToken = require('../src/helpers/genToken');
jest.mock('jsonwebtoken');

test('should return new Token', () => {
	const res = 'token';
	jwt.sign.mockResolvedValue(res);
	genToken({id: 1, email: 'teste@teste.com'}).then(response => {
		expect(response).toEqual(res);
	});
});
