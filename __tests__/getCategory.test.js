const getCategory = require('../openq-api/getCategory');

describe('getCategory', () => {
	const emptyArray = [];

	it('returns correct PRIME category', () => {
		const primeLabels = ['good beginner issue', 'non-profit'];

		expect(getCategory(primeLabels, '0')).toEqual('non-profit');
		expect(getCategory(emptyArray, '0')).toEqual(undefined);
	});

	it('returns correct ONGOING category', () => {
		const ongoingLabels = ['good beginner issue', 'non-profit'];

		expect(getCategory(ongoingLabels, '1')).toEqual('non-profit');
		expect(getCategory(emptyArray, '1')).toEqual(undefined);
	});
});