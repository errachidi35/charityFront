import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiBarChart2, FiBox, FiUsers, FiUserPlus, FiGift, FiMessageCircle } from "react-icons/fi";
import { FiShield, FiLogOut } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import { toast } from "sonner";

const menuItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
  { to: "/admin/missions", label: "Missions", icon: <FiBox /> },
  { to: "/admin/membres", label: "Membres", icon: <FiUsers /> },
  { to: "/admin/benevoles", label: "Bénévoles", icon: <FiUserPlus /> },
  { to: "/admin/donations", label: "Donations", icon: <FiGift /> },
  { to: "/admin/participations", label: "Participations", icon: <FaCalendarAlt /> },
  { to: "/admin/admins", label: "Admins", icon: <FiShield /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    try {
      // Supprimer les données de l'utilisateur du localStorage
      localStorage.removeItem('user');
      
      // Supprimer tous les autres éléments potentiels du localStorage liés à l'authentification
      localStorage.clear();
      
      // Notification de succès
      toast.success("Déconnexion réussie");
      
      // Redirection vers la page de connexion
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error("Erreur lors de la déconnexion");
    }
  };

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between h-screen">
      <div>
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-green-700">Charity Admin</h2>
        </div>
        <nav className="flex flex-col space-y-1 px-4 py-6">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-green-100 text-gray-700 font-medium"
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="px-4 py-6 border-t">
        <p className="text-sm text-gray-500 mb-2">
          Connecté en tant que <span className="font-semibold">{user.prenom || 'Admin'}</span>
        </p>
        <button 
          onClick={handleLogout}
          className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded font-medium flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <FiLogOut />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
