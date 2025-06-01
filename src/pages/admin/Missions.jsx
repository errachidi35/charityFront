import React, { useEffect, useState } from "react";
import { FaTrash, FaComments, FaPlus } from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import axiosAdmin from "../../hooks/axiosAdmin";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const MissionsAdmin = () => {
  const [missions, setMissions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showParticipantsModal, setShowParticipantsModal] = useState(false);
  const [showDiscussionModal, setShowDiscussionModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [selectedMissionId, setSelectedMissionId] = useState(null);
  const [discussions, setDiscussions] = useState({});
  const [formData, setFormData] = useState({
    titre: "",
    dateDebut: "",
    dateFin: "",
    status: "PLANNED",
  });
  const navigate = useNavigate();

  // Charger les missions depuis le backend
  const fetchMissions = async () => {
    try {
      const res = await axiosAdmin.get("/mission/all");
      setMissions(res.data);
      // Charger les discussions pour chaque mission
      res.data.forEach(mission => {
        fetchDiscussionForMission(mission.id);
      });
    } catch (err) {
      console.error("Erreur lors du chargement des missions :", err);
      toast.error("Erreur lors du chargement des missions");
    }
  };

  // Charger la discussion pour une mission
  const fetchDiscussionForMission = async (missionId) => {
    try {
      const res = await axiosAdmin.get(`/discussion/mission/${missionId}`);
      setDiscussions(prev => ({
        ...prev,
        [missionId]: res.data
      }));
    } catch (err) {
      console.error(`Erreur lors du chargement de la discussion pour la mission ${missionId}:`, err);
      setDiscussions(prev => ({
        ...prev,
        [missionId]: null
      }));
    }
  };

  // Créer une discussion pour une mission
  const createDiscussion = async (missionId) => {
    try {
      // Vérifier que l'ID de mission est valide
      if (!missionId) {
        toast.error("ID de mission invalide");
        return;
      }

      // Récupérer les informations de l'utilisateur
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('Current user:', {
        id: user?.id,
        roles: user?.roles,
        token: user?.token ? 'Present' : 'Missing'
      });

      // Créer l'objet discussion avec le bon format
      const discussionData = {
        mission: {
          id: missionId
        },
        titre: `Discussion de la mission #${missionId}`,
        dateCreation: new Date().toISOString()
      };

      console.log("Tentative de création de discussion:", discussionData);

      const response = await axiosAdmin.post("/discussion/create", discussionData);
      
      if (response.data) {
        console.log("Discussion créée:", response.data);
        toast.success("Discussion créée avec succès");
        await fetchDiscussionForMission(missionId);
      }
    } catch (error) {
      console.error("Erreur détaillée:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });
      
      if (error.response?.status === 401) {
        console.log("Vérification des headers de la requête:", error.config?.headers);
        toast.error("Session expirée ou droits insuffisants. Veuillez vous reconnecter.");
        // Attendre un peu avant la redirection pour que l'utilisateur puisse voir le message
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(`Erreur lors de la création de la discussion (${error.response?.status || 'Erreur inconnue'})`);
      }
    }
  };

  // Supprimer une discussion
  const deleteDiscussion = async (discussionId, missionId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette discussion ?")) {
      return;
    }

    try {
      await axiosAdmin.delete(`/discussion/${discussionId}`);
      toast.success("Discussion supprimée avec succès");
      setDiscussions(prev => ({
        ...prev,
        [missionId]: null
      }));
    } catch (err) {
      console.error("Erreur lors de la suppression de la discussion:", err);
      toast.error("Erreur lors de la suppression de la discussion");
    }
  };

  const fetchParticipants = async (missionId) => {
    try {
      const res = await axiosAdmin.get(`/mission/${missionId}/participants`);
      setParticipants(res.data);
      setSelectedMissionId(missionId);
      setShowParticipantsModal(true);
    } catch (err) {
      console.error("Erreur lors du chargement des participants :", err);
      toast.error("Erreur lors du chargement des participants");
    }
  };

  useEffect(() => {
    fetchMissions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        toast.error("Vous devez être connecté pour modifier une mission");
        navigate('/login');
        return;
      }

      if (selectedMissionId) {
        // Mise à jour d'une mission existante
        const response = await axiosAdmin.put(`/mission/${selectedMissionId}`, {
          ...formData,
          type: formData.type || missions.find(m => m.id === selectedMissionId)?.typeMission,
          goal: formData.goal || missions.find(m => m.id === selectedMissionId)?.goal,
          subtitle: formData.subtitle || missions.find(m => m.id === selectedMissionId)?.subtitle
        });

        if (response.data) {
          setMissions(prev =>
            prev.map(m => m.id === selectedMissionId ? response.data : m)
          );
          toast.success("Mission modifiée avec succès");
        }
      } else {
        // Création d'une nouvelle mission
        const response = await axiosAdmin.post("/mission/create", formData);
        if (response.data) {
          setMissions(prev => [...prev, response.data]);
          toast.success("Mission créée avec succès");
        }
      }

      setFormData({ titre: "", dateDebut: "", dateFin: "", status: "PLANNED" });
      setShowModal(false);
      
      // Rafraîchir la liste des missions
      fetchMissions();
    } catch (error) {
      console.error("Erreur détaillée:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      if (error.response?.status === 401) {
        toast.error("Session expirée. Veuillez vous reconnecter.");
        navigate('/login');
      } else if (error.response?.status === 403) {
        toast.error("Vous n'avez pas les droits nécessaires pour cette action");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erreur lors de la modification de la mission");
      }
    }
  };

  const deleteMission = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette mission ?")) {
      return;
    }

    try {
      await axiosAdmin.delete(`/mission/${id}`);
      setMissions((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mission supprimée avec succès");
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      toast.error("Erreur lors de la suppression de la mission");
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Liste des Missions</h2>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Participants</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discussion</th>
                <th className="px-6 py-3 text-right">Actions</th>
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
                  <td className="px-6 py-4">{mission.typeMission}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => fetchParticipants(mission.id)}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {mission.nbParticipants || 0}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {discussions[mission.id] ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">Active</span>
                        <button
                          onClick={() => deleteDiscussion(discussions[mission.id].id, mission.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Supprimer la discussion"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => createDiscussion(mission.id)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        title="Créer une discussion"
                      >
                        <FaPlus size={14} />
                        <span>Créer</span>
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => deleteMission(mission.id)} 
                      className="text-red-600 hover:text-red-800"
                      title="Supprimer la mission"
                    >
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

        {showParticipantsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 md:w-5/6 lg:w-4/5 p-6 rounded shadow-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Participants de la mission #{selectedMissionId}</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Nom</th>
                    <th className="px-4 py-2 text-left">Prénom</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Téléphone</th>
                    <th className="px-4 py-2 text-left">Compétences</th>
                    <th className="px-4 py-2 text-left">Heures Contribuées</th>
                    <th className="px-4 py-2 text-left">Date Participation</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {participants.map((p, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">{p.benevole?.nom || "—"}</td>
                      <td className="px-4 py-2">{p.benevole?.prenom || "—"}</td>
                      <td className="px-4 py-2">{p.benevole?.email || "—"}</td>
                      <td className="px-4 py-2">{p.benevole?.telephone || "—"}</td>
                      <td className="px-4 py-2">{p.benevole?.competences || "Non renseigné"}</td>
                      <td className="px-4 py-2">{p.benevole?.heuresContribuees || "0 h"}</td>
                      <td className="px-4 py-2">{p.dateInscription || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right mt-4">
                <button
                  onClick={() => setShowParticipantsModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
