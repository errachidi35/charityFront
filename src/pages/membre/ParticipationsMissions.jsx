import React, { useEffect, useState } from "react";
import axios from "../../hooks/axiosPrivate";
import { Header } from "../../components/Home/Header";
import { Footer } from "../../components/Home/Footer";

export const ParticipationsMissions = () => {
  const [missions, setMissions] = useState([]);
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    // Étape 1 : récupérer les missions dont je suis responsable
    axios.get("/mission/all")
      .then((res) => {
        const user = JSON.parse(localStorage.getItem("user"));
        const myMissions = res.data.filter(m => m.responsable?.id === user?.id);
        setMissions(myMissions);

        // Étape 2 : pour chaque mission, récupérer les participations
        return Promise.all(
          myMissions.map((mission) =>
            axios.get(`/participation/mission/${mission.id}`)
              .then((resp) => ({ mission, participations: resp.data }))
          )
        );
      })
      .then((results) => {
        setParticipations(results); // tableau de { mission, participations }
      })
      .catch((err) => {
        console.error("Erreur :", err);
      });
  }, []);

  return (
    <>
      <Header />
      <main className="p-8 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Participations reçues</h1>
        
        {participations.length === 0 ? (
          <p className="text-center text-gray-500">Aucune participation trouvée pour vos missions.</p>
        ) : (
          participations.map(({ mission, participations }) => (
            <div key={mission.id} className="mb-6 bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Mission : {mission.nom}
              </h2>
              {participations.length === 0 ? (
                <p className="text-gray-500">Aucune participation pour cette mission.</p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {participations.map((p) => (
                    <li key={p.id} className="py-2">
                      Bénévole ID: {p.benevole.id} - Statut: {p.statut}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
};
