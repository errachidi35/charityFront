// src/pages/admin/Participations.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaTrash } from "react-icons/fa";

export const ParticipationsAdmin = () => {
  const [participations, setParticipations] = useState([
    { id: 1, mission: "Nettoyage de plage", benevole: "Ali Rahmani" },
    { id: 2, mission: "Distribution de repas", benevole: "Leila Benali" },
  ]);

  const deleteParticipation = (id) => {
    setParticipations(participations.filter((p) => p.id !== id));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Participations</h2>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bénévole</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participations.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{p.mission}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{p.benevole}</td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => deleteParticipation(p.id)} className="text-red-600 hover:text-red-800">
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

