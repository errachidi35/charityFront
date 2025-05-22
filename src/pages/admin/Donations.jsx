import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import axiosAdmin from "../../hooks/axiosAdmin";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export const DonationsAdmin = () => {
  const [donations, setDonations] = useState([]);

  // Charger les dons depuis l'API
  const fetchDonations = async () => {
    try {
      const res = await axiosAdmin.get("/don/all");
          console.log("🔥 Données reçues du backend :", res.data);

      setDonations(res.data);
    } catch (err) {
      console.error("Erreur chargement dons :", err);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const deleteDonation = async (id) => {
    try {
      await axiosAdmin.delete(`/don/${id}`);
      setDonations((prev) => prev.filter((don) => don.id !== id));
    } catch (err) {
      console.error("Erreur suppression don :", err);
    }
  };

  const parseMonth = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  const methodData = Object.values(
  donations.reduce((acc, don) => {
    const method = don.moyenPaiement;
    acc[method] = acc[method] || { methode: method, montant: 0 };
    acc[method].montant += don.montant;
    return acc;
  }, {})
);

const monthlyData = Object.values(
  donations.reduce((acc, don) => {
    const month = parseMonth(don.date);
    acc[month] = acc[month] || { month, montant: 0 };
    acc[month].montant += don.montant;
    return acc;
  }, {})
);


  const COLORS = ["#16a34a", "#2563eb", "#f97316", "#7c3aed", "#dc2626"];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h2 className="text-2xl font-bold mb-6">Suivi des Dons</h2>

        <div className="overflow-x-auto bg-white shadow rounded mb-8">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
  <tr>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant (€)</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Méthode</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donateur</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mission</th>
    <th className="px-6 py-3 text-right"></th>
  </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
  {donations.map((don) => (
    <tr key={don.id}>
      <td className="px-6 py-4 whitespace-nowrap">{don.id}</td>
      <td className="px-6 py-4 whitespace-nowrap">{don.date}</td>
      <td className="px-6 py-4 whitespace-nowrap">{don.montant}</td>
      <td className="px-6 py-4 whitespace-nowrap">{don.moyenPaiement}</td>
      <td className="px-6 py-4 whitespace-nowrap">{don.nomDonateur}</td>
<td className="px-6 py-4 whitespace-nowrap">
  {don.mission?.nom ?? "—"}
</td>
      <td className="px-6 py-4 text-right">
        <button onClick={() => deleteDonation(don.id)} className="text-red-600 hover:text-red-800">
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4">Total des dons par mois</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="montant" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-semibold mb-4">Répartition des dons par méthode</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={methodData}
                  dataKey="montant"
                  nameKey="methode"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {methodData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
