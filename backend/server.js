const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	console.log("Client connected", socket.id);

	socket.on("register", (username) => {
		socket.username = username;
	});

	socket.on("message", (message) => {
		io.emit("message", message);
	});

	socket.on("disconnect", () => {
		console.log("disconnect");
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
