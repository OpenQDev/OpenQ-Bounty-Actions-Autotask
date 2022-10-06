const getCategory = (labels) => {
	console.log(labels);
	if (labels && labels.includes("non-profit")) {
		return "non-profit";
	}
	return undefined;
};

module.exports = getCategory;