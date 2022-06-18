const main = require('./main');

exports.handler = async (event) => {
	try {
		let result = await main(event);
		return result;
	} catch (error) {
		return `Error occured during processing: ${error}`;
	}
};

// To run locally (this code will not be executed in Autotasks)
// Local Provider + Contract Setup
if (require.main === module) {
	const app = require('./app');
	const PORT = 8070;
	app.listen(PORT);
	console.log(`Open Zeppelin Autotask listening on http://localhost:${PORT}`);
}