const getTokenReq = require('../openq-api/getTokenReq');

describe('getTokenReq', () => {

	it('returns correct token', () => {
	const zeroAddress = '0x0000000000000000000000000000000000000000';
		const newToken = getTokenReq(zeroAddress, "10000000000000000")
		expect(newToken).toEqual(
{	
	"network": "polygon-pos",
	"tokenVolumes": {
        "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270":  {
           "decimals": 18,
           "volume": "10000000000000000",
         },
       }}
		
		);
	});
});