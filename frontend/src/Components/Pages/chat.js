import React, { useState } from 'react';
import './chat.css';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage, sender: 'user' }]);
      setNewMessage('');
      // Here you can also implement sending the message to a backend or a chat API
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat</div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
