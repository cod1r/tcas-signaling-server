const { Server } = require("socket.io");

const io = new Server({
	cors: {
		origin: [
			"https://gregarious-meerkat-069dbb.netlify.app",
			"http://localhost:8000"
		]
	}
});

io.on("connection", (socket) => {
	socket.broadcast.emit("pjoin", socket.id);
	socket.on("signal", (...args) => {
		let data = args[2];
		let peerConnectionID = args[1];
		let socketidOther = args[0];
		socket.to(socketidOther).emit("preply", socket.id, peerConnectionID, data);
	});
});

console.log("listening...");
io.listen(3001);
