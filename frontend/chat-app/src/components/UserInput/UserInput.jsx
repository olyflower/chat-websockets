import React from "react";
import {
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Box,
} from "@mui/material";

export default function UserInput({
	message,
	messages,
	handleInputChange,
	sendMessage,
}) {
	return (
		<Box>
			<Box display="flex" mt={2}>
				<TextField
					value={message}
					onChange={handleInputChange}
					placeholder="Enter your message"
					variant="outlined"
					fullWidth
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={sendMessage}
					style={{ marginLeft: "8px" }}
				>
					Send
				</Button>
			</Box>
			<List>
				{messages.map((msg, index) => (
					<ListItem key={index}>
						<ListItemText primary={`${msg.user}: ${msg.text}`} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
