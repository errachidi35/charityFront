import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/ui/card";
import {
  FaUser,
  FaTasks,
  FaDonate,
  FaCalendarAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  FiUsers,
  FiUserPlus,
  FiBox,
  FiGift,
  FiMessageCircle,
  FiBarChart2,
  FiImage,
  FiMail,
  FiShield,
} from "react-icons/fi";
import axiosAdmin from "../../hooks/axiosAdmin";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const menuItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FiBarChart2 /> },
  { to: "/admin/missions", label: "Missions", icon: <FiBox /> },
  { to: "/admin/membres", label: "Membres", icon: <FiUsers /> },
  { to: "/admin/benevoles", label: "Bénévoles", icon: <FiUserPlus /> },
  { to: "/admin/donations", label: "Donations", icon: <FiGift /> },
  { to: "/admin/participations", label: "Participations", icon: <FaCalendarAlt /> },
  { to: "/admin/galerie", label: "Galerie", icon: <FiImage /> },
  { to: "/admin/contacts", label: "Contacts", icon: <FiMail /> },
  { to: "/admin/messages", label: "Messages", icon: <FiMessageCircle /> },
  { to: "/admin/admins", label: "Admins", icon: <FiShield /> },
];

export const Dashboard = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const [stats, setStats] = useState({
    membres: 0,
    missions: 0,
    dons: 0,
    events: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [resMembres, resMissions, resDons] = await Promise.all([
          axiosAdmin.get("/membre/all"),
          axiosAdmin.get("/mission/all"),
          axiosAdmin.get("/don/all"),
        ]);

        setStats({
          membres: resMembres.data.length,
          missions: resMissions.data.length,
          dons: resDons.data.reduce((total, don) => total + don.montant, 0),
          events: 3, // à remplacer plus tard par un vrai fetch
        });
      } catch (error) {
        console.error("Erreur lors du chargement des stats :", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm flex flex-col justify-between">
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
            Connecté en tant que <span className="font-semibold">{user?.prenom ?? "Admin"}</span>
          </p>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 w-full text-left bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Tableau de Bord</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-600">Membres Actifs</h4>
                <p className="text-2xl font-bold">{stats.membres}</p>
              </div>
              <FaUser className="text-green-500 text-xl" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-600">Missions en Cours</h4>
                <p className="text-2xl font-bold">{stats.missions}</p>
              </div>
              <FaTasks className="text-yellow-500 text-xl" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-600">Dons (total)</h4>
                <p className="text-2xl font-bold">€{stats.dons}</p>
              </div>
              <FaDonate className="text-pink-500 text-xl" />
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm text-gray-600">Événements à venir</h4>
                <p className="text-2xl font-bold">{stats.events}</p>
              </div>
              <FaCalendarAlt className="text-purple-500 text-xl" />
            </div>
          </Card>
        </div>

        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-semibold mb-2">Activité Récente</h2>
          <p className="text-sm text-gray-500">Les graphiques et les journaux d’activité apparaîtront ici…</p>
        </div>
      </main>
    </div>
  );
};
