import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaTrash } from "react-icons/fa";
import axiosAdmin from "../../hooks/axiosAdmin";

export const BenevolesAdmin = () => {
  const [benevoles, setBenevoles] = useState([]);

  const fetchBenevoles = async () => {
    try {
      const res = await axiosAdmin.get("/benevole/all");
      setBenevoles(res.data);
    } catch (err) {
      console.error("Erreur chargement bénévoles :", err);
    }
  };

  useEffect(() => {
    fetchBenevoles();
  }, []);

  const deleteBenevole = async (id) => {
    try {
      await axiosAdmin.delete(`/benevole/${id}`);
      setBenevoles((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error("Erreur suppression bénévole :", err);
    }
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
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disponibilité</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Compétences</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heures contribuées</th>
    <th className="px-6 py-3 text-right"></th>
  </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
  {benevoles.map((b) => (
    <tr key={b.id}>
      <td className="px-6 py-4">{b.id}</td>
      <td className="px-6 py-4">{b.nom}</td>
      <td className="px-6 py-4">{b.prenom}</td>
      <td className="px-6 py-4">{b.email}</td>
      <td className="px-6 py-4">{b.disponibilite ?? "Non spécifiée"}</td>
      <td className="px-6 py-4">{b.competences ?? "Aucune"}</td>
      <td className="px-6 py-4">{b.heures_contribuees ?? 0}</td>
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
