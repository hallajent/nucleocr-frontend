// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-200 flex flex-col">
      {/* HEADER avec logo centré */}
      <header className="py-8 flex justify-center">
        <img
          src={logo}
          alt="Logo NucleoCR AI"
          className="h-20 w-auto object-contain"
        />
      </header>

      {/* Hero : titre et texte espacés */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-12">
          Bienvenue sur NucleoCR AI
        </h1>
        <p className="text-gray-700 text-xl mb-16 max-w-2xl">
          Votre assistant intelligent pour créer rapidement des comptes-rendus précis et clairs. 
          Simplifiez votre flux de travail avec notre IA dédiée à la rédaction.
        </p>

        <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0">
          <button
            onClick={() => navigate('/login')}
            className="px-10 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-lg font-semibold rounded-full shadow-xl hover:from-blue-800 hover:to-blue-950 transition"
          >
            Se connecter
          </button>
          <button
            onClick={() => alert('Fonction “Découvrir” à implémenter')}
            className="px-10 py-4 bg-white text-blue-900 text-lg font-semibold rounded-full border-2 border-blue-900 shadow hover:bg-gray-100 transition"
          >
            Découvrir
          </button>
        </div>
      </main>

      {/* Section “Features” */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-tr from-blue-50 to-blue-150 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Gagnez du temps</h2>
            <p className="text-gray-700">
              Notre IA analyse vos données et vous propose un compte-rendu clé en main en quelques secondes.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-tr from-blue-50 to-blue-150 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Qualité pro</h2>
            <p className="text-gray-700">
              Vos documents bénéficient d’un style uniforme et d’une mise en forme soignée, pour un rendu professionnel.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-tr from-blue-50 to-blue-150 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Sécurité & confidentialité</h2>
            <p className="text-gray-700">
              Toutes vos informations sont cryptées et stockées en toute sécurité. Votre confidentialité est notre priorité.
            </p>
          </div>
          <div className="p-6 bg-gradient-to-tr from-blue-50 to-blue-150 rounded-2xl shadow-lg hover:scale-105 transition-transform">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Interface intuitive</h2>
            <p className="text-gray-700">
              Notre design épuré et nos boutons arrondis vous garantissent une expérience fluide et agréable.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-blue-900 text-white text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} NucleoCR AI. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default Home;
