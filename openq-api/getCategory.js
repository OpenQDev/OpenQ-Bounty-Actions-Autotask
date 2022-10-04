const getCategory = (labels) => {
	console.log(labels)
		if (labels.includes("not for profit")) {
			return "not for profit";
		}
		return undefined;
	};	

module.exports = getCategory;