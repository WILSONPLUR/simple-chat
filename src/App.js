// @ts-nocheck
import "./App.css";
import React, { useEffect, useState } from "react";
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
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="join room"
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message..."
      />
      <button onClick={sendMessage}>Send Message</button>
      <h1>Chat: </h1>
      <span>{messageReceived}</span>
    </div>
  );
}

export default App;
