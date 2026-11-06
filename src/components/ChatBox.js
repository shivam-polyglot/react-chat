import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";

const ChatBox = ({ activeRoom }) => {
  const [messages, setMessages] = useState([]);
  const [senderName, setSenderName] = useState(
    localStorage.getItem("chatSenderName") || ""
  );
  const messagesRef = useRef(null);

  const roomLabel = useMemo(
    () => activeRoom?.name || "Our Chat",
    [activeRoom]
  );

  useEffect(() => {
    if (!activeRoom?.id) return;

    const q = query(
      collection(db, "rooms", activeRoom.id, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(
        snapshot.docs
          .map(doc => ({ ...doc.data(), id: doc.id }))
          .reverse()
      );
    });

    return () => unsubscribe();
  }, [activeRoom?.id]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const chooseName = name => {
    localStorage.setItem("chatSenderName", name);
    setSenderName(name);
  };

  return (
    <main className="chat-box">
      <header className="chat-box__header">
        <h2>{roomLabel} ❤️</h2>
        <p>Our own little conversation.</p>
      </header>

      {!senderName ? (
        <div className="messages-empty">
          <p>Who is using the chat?</p>
          <button onClick={() => chooseName("Shivam")}>Satyam</button>
          <button onClick={() => chooseName("Sweety")}>Her</button>
        </div>
      ) : (
        <>
          <div className="messages-wrapper" ref={messagesRef}>
            {messages.length ? (
              messages.map(message => (
                <Message key={message.id} message={message} />
              ))
            ) : (
              <div className="messages-empty">
                <p>No messages yet. Start the conversation.</p>
              </div>
            )}
          </div>

          <SendMessage
            roomId={activeRoom?.id}
            senderName={senderName}
          />
        </>
      )}
    </main>
  );
};

export default ChatBox;
