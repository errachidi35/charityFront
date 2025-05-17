import React from "react";
import { Link } from "react-router-dom";
import { FiBarChart2, FiBox, FiUsers, FiUserPlus, FiGift, FiMail, FiCalendar, FiMessageCircle } from "react-icons/fi";
import { FiImage, FiShield } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";

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

const Sidebar = () => {
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
        <p className="text-sm text-gray-500 mb-2">Connecté en tant que <span className="font-semibold">Admin</span></p>
        <button className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded font-medium">
          Se déconnecter
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
