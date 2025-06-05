import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';
import axios from 'axios';

const Chat = () => {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [selectedConvIndex, setSelectedConvIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const savedEmail = localStorage.getItem('email');
    if (!savedEmail) {
      navigate('/login');
    } else {
      setEmail(savedEmail);
      setConversations([{ title: 'Nouveau Chat', messages: [] }]);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const handleNewChat = () => {
    const newChat = { title: `Chat ${conversations.length + 1}`, messages: [] };
    setConversations([...conversations, newChat]);
    setSelectedConvIndex(conversations.length);
  };

  const handleSendMessage = async (text) => {
    const token = localStorage.getItem('token');
    const newMessage = { role: 'user', content: text };
    const updatedConvs = [...conversations];
    updatedConvs[selectedConvIndex].messages.push(newMessage);
    setConversations(updatedConvs);
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiUrl}/ask-nucleocr`,
        {
          messages: [
            ...updatedConvs[selectedConvIndex].messages,
            { role: 'user', content: text }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const lastMessage = response.data.answer || 'Réponse vide.';
      updatedConvs[selectedConvIndex].messages.push({
        role: 'assistant',
        content: lastMessage
      });

      setConversations([...updatedConvs]);
    } catch (error) {
      console.error('Erreur GPT :', error);
      updatedConvs[selectedConvIndex].messages.push({
        role: 'assistant',
        content: 'Erreur lors de la génération de la réponse.'
      });
      setConversations([...updatedConvs]);
    }

    setLoading(false);
  };

  const handleFileUpload = (file) => {
    alert(`Fichier "${file.name}" importé (fonctionnalité à venir)`);
  };

  const currentMessages = conversations[selectedConvIndex]?.messages || [];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <Sidebar
        conversations={conversations}
        onNewChat={handleNewChat}
        onSelect={setSelectedConvIndex}
      />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
        <Header email={email} />

        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
            <ChatWindow
              messages={currentMessages}
              onSend={handleSendMessage}
              onUpload={handleFileUpload}
            />
            {loading && <p style={{ textAlign: 'center', color: '#888' }}>GPT rédige...</p>}
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default Chat;
