const CREATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$bountyId: String!
		$organizationId: String!
	) {
		createBounty(
			address: $address
			bountyId: $bountyId
			organizationId: $organizationId
		) {
			address
			bountyId
			organizationId
		}
	}
`;

module.exports = CREATE_BOUNTY;
