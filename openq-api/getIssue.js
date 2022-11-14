const axios = require('axios');
const { GET_CATEGORY } = require('./graphql');

const getIssue = async (bountyId, pat) => {
	let result;

	try {
		result = await axios
			.post(
				`https://api.github.com/graphql`,
				{
					query: GET_CATEGORY,
					variables: { bountyId },
				},
				{
					headers: {
						Authorization: `Bearer ${pat}`,
					},
				}

			);
		const labels = result.data.data.node.labels.nodes.map(label => label.name.toLowerCase())
			.filter(label => label === "non-profit");
		return { labels, repositoryId: result.data.data.node.repository.id };
	} catch (error) {
		// GraphQL errors at error.response.data.errors
		console.error('error in getIssue', error);
	}


};

module.exports = getIssue;