import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaTrash } from "react-icons/fa";
import axiosAdmin from "../../hooks/axiosAdmin";

export const ParticipationsAdmin = () => {
  const [participations, setParticipations] = useState([]);

  const fetchParticipations = async () => {
    try {
      const res = await axiosAdmin.get("/participation/all");
      setParticipations(res.data);
    } catch (err) {
      console.error("Erreur chargement participations :", err);
    }
  };

  useEffect(() => {
    fetchParticipations();
  }, []);

  const deleteParticipation = async (id) => {
    try {
      await axiosAdmin.delete(`/participation/${id}`);
      setParticipations((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Erreur suppression participation :", err);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Liste des Participations</h2>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bénévole</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'inscription</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participations.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.benevole?.prenom ?? ""} {p.benevole?.nom ?? ""}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.mission?.nom ?? "Non spécifié"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {p.dateInscription ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => deleteParticipation(p.id)}
                      className="text-red-600 hover:text-red-800"
                    >
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
