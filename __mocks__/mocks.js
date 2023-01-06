const mockGetIssue = async (issueId) => {
	return new Promise((resolve, reject) => {
		return resolve({ labels: [] });
	});
};

const mockCreateNewBounty = async (baseUrl, openqApiSecret, bountyAddress, bountyId, organization, repoId,  category, bountyType) => {
	return new Promise((resolve, reject) => {
		return resolve({ baseUrl, openqApiSecret, bountyAddress, bountyId, organization, category, bountyType });
	});
};

mockUpdateBountyValuation = async (baseUrl, openqApiSecret, variables) => {
	return {baseUrl, openqApiSecret, variables}
}

const mockAddToBounty = async (baseUrl, openqApiSecret, tokenBalance, address, add) => {
	return new Promise((resolve, reject) => {
		return resolve({ baseUrl, openqApiSecret, tokenBalance, address, add });
	});
};

const mockBountyUpdater = async (eventType, baseUrl, openqApiSecret, params) => {
	return new Promise((resolve, reject) => {
		return resolve({ eventType, baseUrl, openqApiSecret, params });
	});
};

const mockGithubBot = async (botUrl, eventType, githubBotSecret, params) => {
	return new Promise((resolve, reject) => {
		return resolve({ botUrl, eventType, githubBotSecret, params });
	});
};

const  mockGetValueFromBalance = async (coinAPIReq, coinApiUrl) => {
	return {coinAPIReq, coinApiUrl}
}

module.exports = { mockGetIssue, mockCreateNewBounty, mockAddToBounty, mockBountyUpdater, mockGithubBot, mockGetValueFromBalance, mockUpdateBountyValuation };