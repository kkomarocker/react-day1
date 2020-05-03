const { db } = require("./server/db");
const app = require("./server");
const PORT = 8080;

db
	.sync()
	.then(() => {
		console.log("db connected and synced");
		app.listen(PORT, () => {
			console.log(`Server is listening to the port ${PORT}`);
		});
	});