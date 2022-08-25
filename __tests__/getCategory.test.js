const getCategory = require('../openq-api/getCategory');

describe('getCategory', () => {
	const emptyArray = [];

	it('returns correct PRIME category', () => {
		const primeLabels = ['good beginner issue', 'prime'];

		expect(getCategory(primeLabels, '0')).toEqual('prime');
		expect(getCategory(emptyArray, '0')).toEqual('prime');
	});

	it('returns correct ONGOING category', () => {
		const ongoingLabels = ['good beginner issue', 'learn2earn'];

		expect(getCategory(ongoingLabels, '1')).toEqual('learn2earn');
		expect(getCategory(emptyArray, '1')).toEqual(undefined);
	});

	it('returns correct CONTEST category', () => {
		const contestLabels = ['good beginner issue', 'contest'];

		expect(getCategory(contestLabels, '2')).toEqual('contest');
		expect(getCategory(contestLabels, '3')).toEqual('contest');
		expect(getCategory(emptyArray, '2')).toEqual(undefined);
		expect(getCategory(emptyArray, '3')).toEqual(undefined);
	});
});