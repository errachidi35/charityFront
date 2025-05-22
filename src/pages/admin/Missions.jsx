import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import axiosAdmin from "../../hooks/axiosAdmin";

export const MissionsAdmin = () => {
  const [missions, setMissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    dateDebut: "",
    dateFin: "",
    status: "PLANNED",
  });

  // Charger les missions depuis le backend
  const fetchMissions = async () => {
    try {
      const res = await axiosAdmin.get("/mission/all");
      setMissions(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des missions :", err);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingMission) {
      // Édition locale uniquement (pas de PUT côté backend pour l'instant)
      setMissions((prev) =>
        prev.map((m) =>
          m.id === editingMission.id ? { ...editingMission, ...formData } : m
        )
      );
    }

    setFormData({ titre: "", dateDebut: "", dateFin: "", status: "PLANNED" });
    setEditingMission(null);
    setShowModal(false);
  };

  const deleteMission = async (id) => {
    try {
      await axiosAdmin.delete(`/mission/${id}`);
      setMissions((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const startEdit = (mission) => {
    setEditingMission(mission);
    setFormData({
      titre: mission.titre,
      dateDebut: mission.dateDebut,
      dateFin: mission.dateFin,
      status: mission.status,
    });
    setShowModal(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gestion des Missions</h2>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
  <tr>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Responsable</th> */}
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Objectif</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Collecté</th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sous-titre</th>
    <th className="px-6 py-3 text-right"></th>
  </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
  {missions.map((mission) => (
    <tr key={mission.id}>
      <td className="px-6 py-4">{mission.id}</td>
      <td className="px-6 py-4">{mission.date}</td>
      <td className="px-6 py-4">{mission.nom}</td>
      <td className="px-6 py-4">{mission.lieu}</td>
      <td className="px-6 py-4">{mission.description}</td>
      {/* <td className="px-6 py-4">{mission.type_mission}</td>
      <td className="px-6 py-4">{mission.nb_participants}</td>
      <td className="px-6 py-4">{mission.id_responsable}</td> */}
      <td className="px-6 py-4">{mission.goal} €</td>
      <td className="px-6 py-4">{mission.raised} €</td>
      <td className="px-6 py-4">{mission.subtitle}</td>
      <td className="px-6 py-4 text-right space-x-2">
        <button onClick={() => startEdit(mission)} className="text-blue-600 hover:text-blue-800">
          <FaEdit />
        </button>
        <button onClick={() => deleteMission(mission.id)} className="text-red-600 hover:text-red-800">
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Modifier une mission</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Titre</label>
                  <input name="titre" value={formData.titre} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Date Début</label>
                    <input type="date" name="dateDebut" value={formData.dateDebut} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium">Date Fin</label>
                    <input type="date" name="dateFin" value={formData.dateFin} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium">Statut</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full border rounded px-3 py-2">
                    <option value="PLANNED">Prévue</option>
                    <option value="IN_PROGRESS">En cours</option>
                    <option value="COMPLETED">Terminée</option>
                    <option value="CANCELLED">Annulée</option>
                  </select>
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="bg-gray-200 px-4 py-2 rounded">Annuler</button>
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Modifier</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
