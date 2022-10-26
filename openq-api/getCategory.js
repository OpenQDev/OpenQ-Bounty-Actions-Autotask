const getCategory = (labels) => {
	if (labels && labels.includes("non-profit")) {
		return "non-profit";
	}
	return undefined;
};

module.exports = getCategory;