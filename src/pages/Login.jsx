// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/auth'; // Ajustez le chemin si besoin

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await api.login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      const username = email.split('@')[0];
      localStorage.setItem('username', username);
      navigate('/chat');
    } catch (error) {
      alert('Identifiants invalides');
    } finally {
      setLoading(false);
    }
  };

  const showHelpEmail = () => {
    alert('alexandrehallaj.ent@gmail.com');
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Bloc centré au milieu */}
      <div
        className="
          absolute top-1/2 left-1/2 
          transform -translate-x-1/2 -translate-y-1/2
          w-full max-w-xs 
          bg-white rounded-lg shadow p-6 text-center
        "
      >
        {/* Titre */}
        <h1 className="text-4xl font-bold text-blue-700 mb-6">
          🔬 NucleoCR AI
        </h1>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-20">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              mx-auto w-3/5 border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              mx-auto w-3/5 border border-gray-300 rounded-lg px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />

          <button
            type="submit"
            disabled={loading}
            className={`
              mx-auto w-3/5 py-2 rounded-lg text-white font-semibold transition 
              ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            `}
          >
            {loading ? 'Connexion …' : 'Connexion'}
          </button>
        </form>
      </div>

      {/* Bouton “Besoin d’aide ?” en bas à droite */}
      <button
        type="button"
        onClick={showHelpEmail}
        className="fixed bottom-4 right-4 text-blue-600 hover:underline"
      >
        📧 Besoin d’aide ?
      </button>
    </div>
  );
};

export default Login;
