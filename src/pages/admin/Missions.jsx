// src/pages/admin/Missions.jsx
import React, { useState } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";

export const MissionsAdmin = () => {
  const [missions, setMissions] = useState([
    { id: 1, titre: "Distribution de repas", dateDebut: "2025-06-01", dateFin: "2025-06-10", status: "IN_PROGRESS" },
    { id: 2, titre: "Nettoyage de plage", dateDebut: "2025-06-15", dateFin: "2025-06-18", status: "PLANNED" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMission, setEditingMission] = useState(null);
  const [formData, setFormData] = useState({ titre: "", dateDebut: "", dateFin: "", status: "PLANNED" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMission) {
      setMissions(missions.map(m => m.id === editingMission.id ? { ...editingMission, ...formData } : m));
    } else {
      const newMission = { id: Date.now(), ...formData };
      setMissions([...missions, newMission]);
    }
    setFormData({ titre: "", dateDebut: "", dateFin: "", status: "PLANNED" });
    setEditingMission(null);
    setShowModal(false);
  };

  const deleteMission = (id) => {
    setMissions(missions.filter(m => m.id !== id));
  };

  const startEdit = (mission) => {
    setEditingMission(mission);
    setFormData({
      titre: mission.titre,
      dateDebut: mission.dateDebut,
      dateFin: mission.dateFin,
      status: mission.status
    });
    setShowModal(true);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gestion des Missions</h2>
          {/* <button
            onClick={() => { setShowModal(true); setEditingMission(null); }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            <FaPlus /> Ajouter une mission
          </button> */}
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Début</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Fin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-6 py-3 text-right"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {missions.map((mission) => (
                <tr key={mission.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{mission.titre}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{mission.dateDebut}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{mission.dateFin}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      mission.status === "PLANNED" ? "bg-yellow-100 text-yellow-800" :
                      mission.status === "IN_PROGRESS" ? "bg-blue-100 text-blue-800" :
                      mission.status === "COMPLETED" ? "bg-green-100 text-green-800" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {mission.status}
                    </span>
                  </td>
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
              <h3 className="text-xl font-semibold mb-4">{editingMission ? "Modifier" : "Ajouter"} une mission</h3>
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
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    {editingMission ? "Modifier" : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

