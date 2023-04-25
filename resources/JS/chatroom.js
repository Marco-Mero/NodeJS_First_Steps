const socket = io(); // Connect to the Socket.IO serve

// Listen for chat message events
socket.on("chat message", msg => {
	const li = document.createElement("li");
	li.textContent = msg;
	document.getElementById("messages").appendChild(li);
});

// Send chat message on form submission
document.getElementById("chat-form").addEventListener("submit", e => {
	e.preventDefault();
	const input = document.getElementById("input-message");
	const name = document.getElementById("userName");
	const message = name.value.trim() + ": " + input.value.trim();
	if (message !== "") {
		socket.emit("chat message", message); // Send chat message to the server
		input.value = "";
	}
});
