import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
  const navigate = useNavigate();

  const [conversations, setConversations] = useState([]);
  const [selectedConvIndex, setSelectedConvIndex] = useState(0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = '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';
  const ASSISTANT_ID = 'asst_nHShaoyRQbioBsNdvmtyD4DR';

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
    const newMessage = { role: 'user', content: text };
    const updatedConvs = [...conversations];
    updatedConvs[selectedConvIndex].messages.push(newMessage);
    setConversations(updatedConvs);
    setLoading(true);

    try {
      // 1. Crée un nouveau thread
      const threadRes = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      const thread = await threadRes.json();

      // 2. Ajoute le message utilisateur
      await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          role: 'user',
          content: text
        })
      });

      // 3. Lance la "run"
      const runRes = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2'
        },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID
        })
      });

      const run = await runRes.json();

      // 4. Attendre que la run soit complétée
      let runStatus = run.status;
      while (runStatus !== 'completed') {
        await new Promise((res) => setTimeout(res, 1000)); // pause 1s
        const statusRes = await fetch(`https://api.openai.com/v1/threads/${thread.id}/runs/${run.id}`, {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'OpenAI-Beta': 'assistants=v2'
          }
        });
        const statusData = await statusRes.json();
        runStatus = statusData.status;
      }

      // 5. Récupérer les messages
      const msgRes = await fetch(`https://api.openai.com/v1/threads/${thread.id}/messages`, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'OpenAI-Beta': 'assistants=v2'
        }
      });
      const msgData = await msgRes.json();
      const assistantMessages = msgData.data.filter(m => m.role === 'assistant');
      const lastMessage = assistantMessages[0]?.content[0]?.text?.value || 'Réponse vide.';

      // 6. Ajouter la réponse dans la conversation
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
