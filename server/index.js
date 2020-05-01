const express = require("express");
const bodyParser = require("body-parser");
// const morgan = require("morgan");
const path = require("path");

const app = express();

// app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", require("./api"));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use((err, req, res) => {
	console.error(err.stack);
	res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
