// src/pages/admin/Discussions.jsx
import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaPlus, FaTrash } from "react-icons/fa";

export const DiscussionsAdmin = () => {
  const [discussions, setDiscussions] = useState([
    { id: 1, titre: "Organisation événement Mai", contenu: "Prévoir les tentes et les repas." },
    { id: 2, titre: "Budget 2025", contenu: "Estimer les besoins pour les missions à venir." },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ titre: "", contenu: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDiscussion = { id: Date.now(), ...formData };
    setDiscussions([...discussions, newDiscussion]);
    setFormData({ titre: "", contenu: "" });
    setShowModal(false);
  };

  const deleteDiscussion = (id) => {
    setDiscussions(discussions.filter((d) => d.id !== id));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Discussions</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            <FaPlus /> Nouvelle discussion
          </button>
        </div>

        <div className="bg-white shadow rounded divide-y">
          {discussions.map((d) => (
            <div key={d.id} className="p-6 hover:bg-gray-50 flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-green-700">{d.titre}</h4>
                <p className="text-gray-700 mt-1">{d.contenu}</p>
              </div>
              <button onClick={() => deleteDiscussion(d.id)} className="text-red-600 hover:text-red-800">
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
              <h3 className="text-xl font-semibold mb-4">Créer une discussion</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Titre</label>
                  <input name="titre" value={formData.titre} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium">Contenu</label>
                  <textarea name="contenu" value={formData.contenu} onChange={handleChange} rows={4} className="w-full border rounded px-3 py-2" required />
                </div>
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setShowModal(false)} className="bg-gray-200 px-4 py-2 rounded">Annuler</button>
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Créer</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

