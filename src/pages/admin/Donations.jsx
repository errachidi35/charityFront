// src/pages/admin/Donations.jsx
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

export const DonationsAdmin = () => {
  const [donations, setDonations] = useState([
    { id: 1, montant: 100, methode: "CB", date: "2025-01-05", donateur: "Jean Dupont" },
    { id: 2, montant: 250, methode: "Paypal", date: "2025-01-18", donateur: "Claire Martin" },
    { id: 3, montant: 150, methode: "CB", date: "2025-02-10", donateur: "Ali Rahmani" },
    { id: 4, montant: 180, methode: "CB", date: "2025-02-15", donateur: "Sofia Lemoine" },
    { id: 5, montant: 120, methode: "Especes", date: "2025-03-01", donateur: "Zakaria Meftah" },
    { id: 6, montant: 300, methode: "Virement", date: "2025-03-22", donateur: "Isabelle Petit" },
    { id: 7, montant: 220, methode: "Paypal", date: "2025-04-11", donateur: "Farid El Yazid" },
    { id: 8, montant: 170, methode: "CB", date: "2025-04-25", donateur: "Julie Morel" },
    { id: 9, montant: 90, methode: "Especes", date: "2025-05-02", donateur: "Nina Dupuis" },
    { id: 10, montant: 250, methode: "Virement", date: "2025-05-13", donateur: "Hamza Belkacem" }
  ]);

  const deleteDonation = (id) => {
    setDonations(donations.filter((don) => don.id !== id));
  };

  const parseMonth = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  const monthlyData = Object.values(
    donations.reduce((acc, don) => {
      const month = parseMonth(don.date);
      acc[month] = acc[month] || { month, montant: 0 };
      acc[month].montant += don.montant;
      return acc;
    }, {})
  );

  const methodData = Object.values(
    donations.reduce((acc, don) => {
      acc[don.methode] = acc[don.methode] || { methode: don.methode, montant: 0 };
      acc[don.methode].montant += don.montant;
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Montant (€)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Moyen de paiement</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((don) => (
                <tr key={don.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{don.donateur}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{don.montant}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{don.methode}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{don.date}</td>
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
