const { Server } = require("socket.io");

const io = new Server({
	cors: {
		origin: '*'
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
io.listen(process.env.PORT);
