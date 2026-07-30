import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import freelancers from "../data/freelancers";
import "./Chat.css";

function Chat() {
  const { id } = useParams();

  const freelancer = freelancers.find(
    (item) => item.id === Number(id)
  );

  const storageKey = `chat_${id}`;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved =
      JSON.parse(localStorage.getItem(storageKey)) || [];

    setMessages(saved);
  }, [storageKey]);

  const sendMessage = () => {
    if (text.trim() === "") return;

    const newMessages = [
      ...messages,
      {
        sender: "You",
        text: text,
      },
      {
        sender: freelancer.name,
        text: "Thanks! I'll reply soon.",
      },
    ];

    setMessages(newMessages);

    localStorage.setItem(
      storageKey,
      JSON.stringify(newMessages)
    );

    setText("");
  };

  return (
    <>
      <Navbar />

      <div className="chat-page">

        <div className="chat-box">

          <h2>💬 Chat with {freelancer.name}</h2>

          <div className="messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "You"
                    ? "my-message"
                    : "their-message"
                }
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}

          </div>

          <div className="chat-input">

            <input
              type="text"
              placeholder="Type your message..."
              value={text}
              onChange={(e) =>
                setText(e.target.value)
              }
            />

            <button onClick={sendMessage}>
              Send
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Chat;