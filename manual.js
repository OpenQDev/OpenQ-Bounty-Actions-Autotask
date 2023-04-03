const bountyUpdater = require('./openq-api/bountyUpdater')
const params ={
	bountyAddress: '0x2b961e3959b79326a8e7f64ef0d2d825707669b5',
	bountyType: { type: 'BigNumber', hex: '0x03' },
	data: '0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
	}
	const baseUrl = "http://localhost:3000"
	const openqApiSecret = "secret"
	const eventType = "SupportingDocumentsCompleteSet"
bountyUpdater(eventType, baseUrl, openqApiSecret, params)