import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ roomId, senderName }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async event => {
    event.preventDefault();

    const trimmed = message.trim();

    if (!trimmed || !senderName || !roomId) return;

    try {
      await addDoc(collection(db, "rooms", roomId, "messages"), {
        text: trimmed,
        name: senderName,
        avatar: "",
        createdAt: serverTimestamp(),
      });

      setMessage("");
    } catch (error) {
      console.error("Could not send message:", error);
      alert("Message could not be sent. Check your connection and Firebase rules.");
    }
  };

  return (
    <form onSubmit={sendMessage} className="send-message">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={event => setMessage(event.target.value)}
        maxLength={500}
      />
      <button type="submit" disabled={!senderName}>
        Send
      </button>
    </form>
  );
};

export default SendMessage;
