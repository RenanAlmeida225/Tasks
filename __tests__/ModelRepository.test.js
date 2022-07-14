const ModelRepository = require('../src/repositories/ModelRepository');

const mock = {};

const modelRepository = new ModelRepository(mock);

describe('ModelRepository', () => {
	it('should return data', async () => {
		const data = {userName: 'teste'};
		mock.create = jest.fn();
		mock.create.mockReturnValueOnce(data);
		const res = await modelRepository.save(data);
		expect(res).toBe(data);
	});
});
