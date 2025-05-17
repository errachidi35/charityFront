// src/pages/admin/Benevoles.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaTrash } from "react-icons/fa";

export const BenevolesAdmin = () => {
  const [benevoles, setBenevoles] = useState([
    { id: 1, nom: "Ahmed", prenom: "Zaki", email: "azaki@mail.com", disponibilite: "Weekends" },
    { id: 2, nom: "Leila", prenom: "Benali", email: "lbenali@mail.com", disponibilite: "Evenings" },
  ]);

  const deleteBenevole = (id) => {
    setBenevoles(benevoles.filter((b) => b.id !== id));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Liste des Bénévoles</h2>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disponibilité</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {benevoles.map((b) => (
                <tr key={b.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{b.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.prenom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{b.disponibilite}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => deleteBenevole(b.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

