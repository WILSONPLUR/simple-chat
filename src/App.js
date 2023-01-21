// @ts-nocheck
import "./App.css";
import React, { useEffect, useState } from "react";
import {TextField, Button, Box, Typography} from "@mui/material"
import io from "socket.io-client";

const socket = io.connect("http://localhost:3005");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");
  // const [writtenBy, setWrittenBy] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };
  const joinRoom = () => {
    if (room !== "") socket.emit("join_room", room);
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <Box marginY="300px" className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <TextField size="small" value={room}  onChange={(e) => setRoom(e.target.value)} id="outlined-basic" label="Enter room" variant="outlined" />
          <Button onClick={joinRoom} size="normal" variant="contained">Join Room</Button>
      </div>
        <Box marginTop="20px" display="flex" alignItems="center" justifyContent="center">
            <TextField size="small" value={message}  onChange={(e) => setMessage(e.target.value)} id="outlined-basic" label="Your message..." variant="outlined" />
            <Button onClick={sendMessage} size="normal" variant="contained">Send Message</Button>
        </Box>
      <Typography variant="h4" marginY="20px">Chat: </Typography>
      <Typography variant="body1" component="span">{messageReceived}</Typography>
    </Box>
  );
}

export default App;
