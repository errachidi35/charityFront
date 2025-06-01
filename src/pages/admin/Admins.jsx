import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaPlus, FaTrash, FaEdit, FaKey } from "react-icons/fa";
import axiosAdmin from "../../hooks/axiosAdmin";

export const AdminsManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    role: "ADMIN",
  
  });

  const fetchAdmins = async () => {
    try {
      const res = await axiosAdmin.get("/admin/all");
      setAdmins(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des administrateurs :", err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
       
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedAdmin) {
        await axiosAdmin.put(`/admin/${selectedAdmin.id}`, formData);
      } else {
        await axiosAdmin.post("/admin/create", formData);
      }
      fetchAdmins();
      setShowModal(false);
      resetForm();
    } catch (err) {
      console.error("Erreur lors de l'opération :", err);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axiosAdmin.put(`/admin/${selectedAdmin.id}/password`, {
        motDePasse: formData.motDePasse
      });
      setShowPasswordModal(false);
      resetForm();
    } catch (err) {
      console.error("Erreur lors du changement de mot de passe :", err);
    }
  };

  const deleteAdmin = async (id) => {
    try {
      await axiosAdmin.delete(`/admin/${id}`);
      setAdmins(admins.filter(admin => admin.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  const startEdit = (admin) => {
    setSelectedAdmin(admin);
    setFormData({
      nom: admin.nom,
      prenom: admin.prenom,
      email: admin.email,
      role: admin.role,
     
    });
    setShowModal(true);
  };

  const startPasswordChange = (admin) => {
    setSelectedAdmin(admin);
    setFormData({ ...formData, motDePasse: "" });
    setShowPasswordModal(true);
  };

  const resetForm = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      motDePasse: "",
      role: "ADMIN",
      
    });
    setSelectedAdmin(null);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gestion des Administrateurs</h2>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            <FaPlus /> Nouvel administrateur
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {admins.map((admin) => (
                <tr key={admin.id}>
                  <td className="px-6 py-4">{admin.id}</td>
                  <td className="px-6 py-4">{admin.nom}</td>
                  <td className="px-6 py-4">{admin.prenom}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button onClick={() => startEdit(admin)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => startPasswordChange(admin)} className="text-yellow-600 hover:text-yellow-800">
                        <FaKey />
                      </button>
                      <button onClick={() => deleteAdmin(admin.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal d'édition/création */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                {selectedAdmin ? "Modifier un administrateur" : "Nouvel administrateur"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                {!selectedAdmin && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Mot de passe</label>
                    <input
                      type="password"
                      name="motDePasse"
                      value={formData.motDePasse}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2"
                      required
                    />
                  </div>
                )}
              
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    {selectedAdmin ? "Modifier" : "Créer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de changement de mot de passe */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Changer le mot de passe</h3>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                  <input
                    type="password"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPasswordModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Changer
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