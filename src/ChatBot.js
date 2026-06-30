import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('https://mds-novatech.onrender.com/api/chat', {        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const botMessage = { role: 'bot', text: data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      alert('Erreur: ' + error.message);
    }

    setLoading(false);
  };

  return (
    <>
      {/* BOUTON FLOTTANT */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #2a52c9, #3a6fff)',
          color: 'white',
          border: 'none',
          boxShadow: '0 4px 20px rgba(42,82,201,0.4)',
          cursor: 'pointer',
          fontSize: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s',
        }}
      >
        {isOpen ? <FontAwesomeIcon icon={faTimes} /> : <FontAwesomeIcon icon={faRobot} />}
      </button>

      {/* FENÊTRE DE CHAT */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            zIndex: 9998,
            width: '350px',
            maxHeight: '500px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            border: '1px solid #e0e0e0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* EN-TÊTE */}
          <div
            style={{
              background: 'linear-gradient(135deg, #2a52c9, #3a6fff)',
              color: 'white',
              padding: '15px 18px',
              fontWeight: 'bold',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <FontAwesomeIcon icon={faRobot} />
            Mon Bot IA
          </div>

          {/* MESSAGES */}
          <div
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              maxHeight: '350px',
              background: '#f9f9f9',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  margin: '8px 0',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    background: msg.role === 'user' ? '#2a52c9' : '#e0e0e0',
                    color: msg.role === 'user' ? 'white' : 'black',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    maxWidth: '80%',
                    fontSize: '14px',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ textAlign: 'left', margin: '8px 0' }}>
                <div
                  style={{
                    display: 'inline-block',
                    background: '#e0e0e0',
                    padding: '8px 14px',
                    borderRadius: '12px',
                    fontSize: '14px',
                  }}
                >
                  <FontAwesomeIcon icon={faSpinner} spin /> En train d'écrire...
                </div>
              </div>
            )}
          </div>

          {/* INPUT */}
          <div
            style={{
              display: 'flex',
              padding: '10px',
              background: 'white',
              borderTop: '1px solid #e0e0e0',
              gap: '8px',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tapez votre message..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '20px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '14px',
              }}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button
              onClick={sendMessage}
              style={{
                background: '#2a52c9',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
