// DashboardAdmin.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Si l’utilisateur n’est pas admin, on redirige
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: "32px", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
      <h1>Tableau de bord – Admin</h1>
      <p>Bienvenue, {localStorage.getItem("name")} ! Ceci est une page réservée aux administrateurs.</p>
      {/* Ici, tu pourras plus tard ajouter la gestion des utilisateurs, logs, etc. */}
    </div>
  );
};

export default DashboardAdmin;
