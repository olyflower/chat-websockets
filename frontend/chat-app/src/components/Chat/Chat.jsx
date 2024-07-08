import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import UserInput from "../UserInput/UserInput";
import { TextField, Button, Container, Box } from "@mui/material";

const socket = io("http://localhost:5000");

export default function Chat() {
	const [username, setUsername] = useState(
		localStorage.getItem("username") || ""
	);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState(
		JSON.parse(localStorage.getItem("messages")) || []
	);
	const [isRegistered, setIsRegistered] = useState(
		!!localStorage.getItem("username")
	);

	useEffect(() => {
		if (isRegistered) {
			socket.emit("register", username);
		}

		socket.on("message", (msg) => {
			console.log("Message received:", msg);
			setMessages((prevMessages) => [...prevMessages, msg]);
		});

		return () => {
			socket.off("message");
		};
	}, [isRegistered, username]);

	const handleRegister = () => {
		if (username) {
			socket.emit("register", username);
			localStorage.setItem("username", username);
			setIsRegistered(true);
		}
	};

	const handleInputChange = (e) => {
		setMessage(e.target.value);
	};

	const sendMessage = () => {
		if (message && username) {
			const msg = {
				user: username,
				text: message,
			};
			socket.emit("message", msg);
			setMessage("");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("username");
		setIsRegistered(false);
		setUsername("");
		setMessages([]);
	};

	return (
		<Container>
			{!isRegistered ? (
				<Box
					display="flex"
					flexDirection="column"
					alignItems="center"
					mt={4}
				>
					<TextField
						label="Enter your username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						variant="outlined"
						margin="normal"
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleRegister}
					>
						Register
					</Button>
				</Box>
			) : (
				<>
					<UserInput
						message={message}
						messages={messages}
						handleInputChange={handleInputChange}
						sendMessage={sendMessage}
					/>
					<Button
						variant="contained"
						color="secondary"
						onClick={handleLogout}
						style={{ marginTop: "16px" }}
					>
						Logout
					</Button>
				</>
			)}
		</Container>
	);
}
