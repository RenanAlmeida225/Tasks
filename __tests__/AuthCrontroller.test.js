const AuthCrontoller = require('../src/controllers/AuthCrontroller');
const comparePassword = require('../src/helpers/comparePassword');
const MockUser = {};
const authCrontoller = new AuthCrontoller(MockUser);

jest.mock('../src/helpers/comparePassword');

describe('AuthContoller', () => {
	describe('Register', () => {
		it('should return error Missing param userName!', async () => {
			try {
				await authCrontoller.register({});
			} catch (error) {
				expect(error.message).toEqual('Missing param userName!');
			}
		});

		it('should return error Missing param email!', async () => {
			try {
				await authCrontoller.register({userName: 'test'});
			} catch (error) {
				expect(error.message).toEqual('Missing param email!');
			}
		});

		it('should return error Missing param password!', async () => {
			try {
				await authCrontoller.register({
					userName: 'test',
					email: 'teste@teste.com'
				});
			} catch (error) {
				expect(error.message).toEqual('Missing param password!');
			}
		});

		it('should return user', async () => {
			const data = {
				userName: 'teste',
				email: 'teste@teste.com',
				password: 'teste123'
			};
			MockUser.create = jest.fn();
			MockUser.create.mockResolvedValue(data);
			const res = await authCrontoller.register(data);
			expect(res).toEqual(data);
		});
	});

	describe('Login', () => {
		it('should return error Missing param email!', async () => {
			try {
				await authCrontoller.login({});
			} catch (error) {
				expect(error.message).toEqual('Missing param email!');
			}
		});

		it('should return error Missing param password!', async () => {
			try {
				await authCrontoller.login({email: 'teste@teste.com'});
			} catch (error) {
				expect(error.message).toEqual('Missing param password!');
			}
		});
		it('should return error Password incorret', async () => {
			const data = {email: 'teste@teste.com', password: 'teste123'};
			MockUser.findOne = jest.fn();
			MockUser.findOne.mockResolvedValue(data);
			comparePassword.mockResolvedValue(false);
			try {
				await authCrontoller.login(data);
			} catch (error) {
				expect(error.message).toEqual('Password incorret!');
			}
		});

		it('should return error User not found!', async () => {
			MockUser.findOne = jest.fn();
			MockUser.findOne.mockResolvedValue(null);
			comparePassword.mockResolvedValue(true);
			try {
				await authCrontoller.login({
					email: 'teste@teste.com',
					password: 'teste123'
				});
			} catch (error) {
				expect(error.message).toEqual('User not found!');
			}
		});

		it('should return user', async () => {
			const data = {email: 'teste@teste.com', password: 'teste123'};
			MockUser.findOne = jest.fn();
			MockUser.findOne.mockResolvedValue(data);
			comparePassword.mockResolvedValue(true);
			const res = await authCrontoller.login(data);
			expect(res).toEqual(data);
		});
	});
});
