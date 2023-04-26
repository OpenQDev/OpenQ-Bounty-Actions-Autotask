const CREATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$bountyId: String!
		$organizationId: String!
		$type: String!
		$repositoryId: String!
		$category: String
		$creatingUserId: String
		$title: String
		$budgetValue: Float!
	) {
		createBounty(
			address: $address
			bountyId: $bountyId
			organizationId: $organizationId
			type: $type
			repositoryId: $repositoryId
			category: $category
			creatingUserId: $creatingUserId
			title: $title
			budgetValue: $budgetValue
		) {
			address
			repositoryId
			bountyId
			organizationId
			type
		}
	}
`;

module.exports = CREATE_BOUNTY;
