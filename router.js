const path = require("path");
const fs = require("fs");
const { log } = require("console");

const EXTENSION = ".html";
const BASE_PATH = "/pages/";

function getFilePath(pageName) {
	return path.join(__dirname, "public", BASE_PATH + pageName + EXTENSION);
}

function getRoute(pageName, res) {
	filePath = getFilePath(pageName);
	fs.readFile(filePath, (err, data) => {
		if (err) {
			res.statusCode = 500;
			res.setHeader("Content-Type", "text/plain");
			res.end(`Error reading file: ${err.message}`);
		} else {
			res.statusCode = 200;
			res.setHeader("Content-Type", "text/html");
			res.end(data);
		}
	});
}

function getExample(res) {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("HelloWorld!");
}

module.exports = { getRoute, getExample };
