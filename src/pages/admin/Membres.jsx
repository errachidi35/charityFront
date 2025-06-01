import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FaPlus, FaTrash, FaKey } from "react-icons/fa";
import axiosAdmin from "../../hooks/axiosAdmin";
import { toast } from "sonner";

export const Membres = () => {
  const [membres, setMembres] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedMembre, setSelectedMembre] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    domaine: "",
  });
  const [newPassword, setNewPassword] = useState("");

  // Récupérer la liste des membres au chargement
  const fetchMembres = async () => {
    try {
      const res = await axiosAdmin.get("/membre/all");
      setMembres(res.data);
    } catch (err) {
      console.error("Erreur lors de la récupération des membres :", err);
    }
  };

  useEffect(() => {
    fetchMembres();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axiosAdmin.put(`/membre/${selectedMembre.id}/reset-password`, {
        newPassword: newPassword
      });
      toast.success("Mot de passe réinitialisé avec succès");
      setShowResetModal(false);
      setNewPassword("");
      setSelectedMembre(null);
    } catch (err) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", err);
      toast.error("Erreur lors de la réinitialisation du mot de passe");
    }
  };

  const startResetPassword = (membre) => {
    setSelectedMembre(membre);
    setShowResetModal(true);
  };

  // Ajouter un membre via le backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosAdmin.post("/admin/createmembre", formData);
      setFormData({ nom: "", prenom: "", email: "", motDePasse: "", domaine: "" });
      setShowModal(false);
      fetchMembres(); // Recharger la liste
      toast.success("Membre créé avec succès");
    } catch (err) {
      console.error("Erreur lors de la création du membre :", err);
      toast.error("Erreur lors de la création du membre");
    }
  };

  // Supprimer un membre
  const deleteMembre = async (id) => {
    try {
      await axiosAdmin.delete(`/membre/${id}`);
      setMembres((prev) => prev.filter((m) => m.id !== id));
      toast.success("Membre supprimé avec succès");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      toast.error("Erreur lors de la suppression du membre");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Gestion des Membres</h2>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
          >
            <FaPlus /> Ajouter un membre
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Domaine</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'inscription</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {membres.map((membre) => (
                <tr key={membre.id}>
                  <td className="px-6 py-4">{membre.id}</td>
                  <td className="px-6 py-4">{membre.nom}</td>
                  <td className="px-6 py-4">{membre.prenom}</td>
                  <td className="px-6 py-4">{membre.email}</td>
                  <td className="px-6 py-4">{membre.domaine}</td>
                  <td className="px-6 py-4">{membre.dateInscription}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => startResetPassword(membre)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Réinitialiser le mot de passe"
                      >
                        <FaKey />
                      </button>
                      <button
                        onClick={() => deleteMembre(membre.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Supprimer le membre"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal d'ajout de membre */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Ajouter un membre</h3>
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
                <div>
                  <label className="block text-sm font-medium mb-1">Mot de passe initial</label>
                  <input
                    type="password"
                    name="motDePasse"
                    value={formData.motDePasse}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Domaine</label>
                  <input
                    type="text"
                    name="domaine"
                    value={formData.domaine}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal de réinitialisation de mot de passe */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                Réinitialiser le mot de passe
                {selectedMembre && (
                  <span className="block text-sm text-gray-500 mt-1">
                    pour {selectedMembre.prenom} {selectedMembre.nom}
                  </span>
                )}
              </h3>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    required
                    minLength={6}
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowResetModal(false);
                      setNewPassword("");
                      setSelectedMembre(null);
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    Réinitialiser
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
