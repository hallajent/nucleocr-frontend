// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/auth';
import logo from '../assets/logo.png';
import loginBg from '../assets/animations/login-bg.png';

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
    // 1. Container full-screen avec image de fond
    <div
      className="
        relative
        w-full h-screen
        bg-cover bg-center
        flex items-center justify-center
      "
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* 2. Overlay sombre semi-opaque (pour faire ressortir la carte) */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* 3. Carte de connexion centrée */}
      <div className="relative z-10 w-full max-w-sm bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {/* 3.1 Logo centré en haut de la carte */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="Logo NucleoCR AI"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* 3.2 Titre et sous-titre */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Identifiez-vous
        </h2>
        <p className="text-gray-600 text-sm text-center mb-6">
          Entrez votre identifiant et votre mot de passe
        </p>

        {/* 3.3 Formulaire */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Adresse e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full px-4 py-2 
              border border-gray-300 rounded-lg 
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
              w-full px-4 py-2 
              border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          />
          <button
            type="submit"
            disabled={loading}
            className={`
              w-full py-2 rounded-lg text-white font-semibold transition 
              ${loading 
                ? 'bg-blue-300 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
              }
            `}
          >
            {loading ? 'Connexion en cours…' : 'Valider'}
          </button>
        </form>

        {/* 3.4 Lien “Mot de passe oublié ?” */}
        <p className="mt-6 text-center text-sm text-gray-700">
          <button type="button" onClick={showHelpEmail} className="hover:underline">
            Mot de passe oublié ?
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
