import { useState, useEffect, useRef } from 'react';
import './ChatWindow.css';

const ChatWindow = ({ messages, onSend, onUpload }) => {
  const [input, setInput] = useState('');
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    onSend(input);
    setInput('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role === 'user' ? 'user' : 'assistant'}`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        {/* BOUTON "+" */}
        <button
          type="button"
          className="icon-btn"
          onClick={() => fileInputRef.current.click()}
          title="Importer un fichier"
        >
          +
        </button>
        <input
          type="file"
          accept=".pdf,.txt"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* CHAMP DE TEXTE */}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="Écrire un message..."
        />

        {/* ENVOYER */}
        <button type="submit" className="send-btn">
          ➤
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;


