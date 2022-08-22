const CREATE_BOUNTY = `
	mutation Mutation(
		$address: String!
		$bountyId: String!
		$organizationId: String!
<<<<<<< HEAD
		$type: String!
		$category: String
=======
		$bountyType: String!
>>>>>>> b92d55c25182fa1af03ec7728d1c047ac39750c5
	) {
		createBounty(
			address: $address
			bountyId: $bountyId
			organizationId: $organizationId
<<<<<<< HEAD
			type: $type
			category: $category
=======
			type: $bountyType
>>>>>>> b92d55c25182fa1af03ec7728d1c047ac39750c5
		) {
			address
			bountyId
			organizationId
			type
		}
	}
`;

module.exports = CREATE_BOUNTY;
