const socketIO = require("socket.io");
const http = require("http");
const router = require("./router");

const hostname = "127.0.0.1";
const port = "8000";

const server = http
	.createServer((req, res) => {
		switch (req.method) {
			case "GET":
				switch (req.url) {
					case "/test":
						router.getExample(res);
						break;
					case "/":
						router.getRoute("index", res);
						break;
					case "/index":
						res.statusCode = 301;
						res.setHeader("Location", "/");
						res.end();
						break;
					default:
						router.getRoute(req.url, res);
						break;
				}
		}
	})
	.listen(port, hostname, () => {
		console.log(`http://${hostname}:${port}`);
	});

const io = socketIO(server);

io.on("connection", socket => {
	console.log("A user connected");

	// Listen for chat messages
	socket.on("chat message", message => {
		// Broadcast the message to all connected clients
		io.emit("chat message", message);
	});

	// Listen for user disconnection
	socket.on("disconnect", () => {
		console.log("A user disconnected");
	});
});
