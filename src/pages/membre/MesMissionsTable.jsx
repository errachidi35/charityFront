import React, { useEffect, useState } from "react";
import axiosPrivate from "../../hooks/axiosPrivate";
import { Header } from "../../components/Home/Header";
import { Footer } from "../../components/Home/Footer";

export const MesMissionsTable = () => {
  const [missions, setMissions] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMissionId, setSelectedMissionId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    axiosPrivate.get("/mission/all")
      .then(res => {
        const mesMissions = res.data.filter(m => m.responsable?.id === userId);
        setMissions(mesMissions);
      })
      .catch(console.error);
  }, []);

  const fetchParticipants = async (missionId) => {
    try {
      const res = await axiosPrivate.get(`/mission/${missionId}/participants`);
      setParticipants(res.data);
      console.log("Participants récupérés :", res.data);

      setSelectedMissionId(missionId);
      setShowModal(true);
    } catch (err) {
      console.error("Erreur récupération participants :", err);
    }
  };

  return (
    <>
      <Header />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">Mes Missions (Vue Tableau)</h1>
        <div className="overflow-x-auto bg-white shadow-md rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Nom</th>
                <th className="px-6 py-3 text-left">Lieu</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Participants</th>
                <th className="px-6 py-3 text-left">Objectif (€)</th>
                <th className="px-6 py-3 text-left">Collecté (€)</th>
                <th className="px-6 py-3 text-left">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {missions.map((m) => (
                <tr key={m.id}>
                  <td className="px-6 py-4">{m.nom}</td>
                  <td className="px-6 py-4">{m.lieu}</td>
                  <td className="px-6 py-4">{m.date}</td>
                  <td
                    className="px-6 py-4 text-blue-600 hover:underline cursor-pointer"
                    onClick={() => fetchParticipants(m.id)}
                  >
                    {m.nbParticipants}
                  </td>
                  <td className="px-6 py-4">{m.goal}</td>
                  <td className="px-6 py-4">{m.raised}</td>
                  <td className="px-6 py-4">{m.typeMission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {showModal && (
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
    <th className="px-4 py-2 text-left">Competences</th>
    <th className="px-4 py-2 text-left">Heures Contibuees</th>
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
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
