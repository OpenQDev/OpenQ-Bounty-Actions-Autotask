const mockGetIssue = async (issueId) => {
	return new Promise((resolve, reject) => {
		return resolve({ labels: [] });
	});
};

const mockCreateNewBounty = async (baseUrl, openqApiSecret, bountyAddress, bountyId, organization, category, type) => {
	return new Promise((resolve, reject) => {
		return resolve({ baseUrl, openqApiSecret, bountyAddress, bountyId, organization, category, type });
	});
};

module.exports = { mockGetIssue, mockCreateNewBounty };