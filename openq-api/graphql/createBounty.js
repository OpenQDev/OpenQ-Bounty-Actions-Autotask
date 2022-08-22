const CREATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$bountyId: String!
		$organizationId: String!
		$bountyType: String!
	) {
		createBounty(
			address: $address
			bountyId: $bountyId
			organizationId: $organizationId
			type: $bountyType
		) {
			address
			bountyId
			organizationId
			type
		}
	}
`;

module.exports = CREATE_BOUNTY;
