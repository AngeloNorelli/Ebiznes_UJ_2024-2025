import React, { useState, useRef, useEffect } from 'react';
import "../styles/Chatbot.css";

const greetingMessages = [
  "Hello! How can I assist you today?",
  "Hi there! What can I help you with?",
  "Greetings! How may I be of service?",
  "Welcome! What do you need assistance with?",
  "Hey! How can I help you today?",
];

const farewellsMessages = [
  "Goodbye! Have a great day!",
  "See you later! Take care!",
  "Farewell! Wishing you all the best!",
  "Until next time! Stay safe!",
  "Bye! Hope to chat again soon!",
];

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0 ) {
      const greeting = greetingMessages[Math.floor(Math.random() * greetingMessages.length)];
      setMessages([{ from: "bot", text: greeting }]);
    }
  }

  const handleClose = () => {
    const farewell = farewellsMessages[Math.floor(Math.random() * farewellsMessages.length)];
    setMessages((msgs) => [...msgs, { from: "bot", text: farewell }]);
    setTimeout(() => setOpen(false), 1000);
  }

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { from: "bot", text: data.response }]);
    } catch {
      setMessages((msgs) => [...msgs, { from: "bot", text: "Sorry, I couldn't process your request." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="chatbot-bubble" onClick={handleOpen}>
        💬
      </div>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h2>Chatbot</h2>
            <button onClick={handleClose}>✕</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-message ${msg.from}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chatbot-message bot">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()}>Send</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;