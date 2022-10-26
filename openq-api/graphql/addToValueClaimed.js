const ADD_TO_VALUE_CLAIMED = `
		mutation addToTvc(
		$tokenAddress: String!
		$volume: String!
		$address:String!
		$add: Boolean! 
	) {
		addToTvc(
			tokenAddress: $tokenAddress
			volume: $volume
			address: $address
			add: $add
		) {
			address
		}
	}
`;

module.exports = ADD_TO_VALUE_CLAIMED;
