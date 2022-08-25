const getCategory = (labels, type) => {
	if (type === "0" || labels.some(label => label === "prime")) {
		return "prime";
	}
	if (type === "1" && labels.some(label => label === "learn2earn")) {
		return "learn2earn";
	}
	if ((type === "2" || type === "3") && labels.some(label => label === "contest")) {
		return "contest";
	}
	return undefined;
};

module.exports = getCategory;