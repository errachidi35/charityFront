import React, { useEffect, useState } from "react";
import axios from "../../hooks/axiosPrivate";
import { Header } from "../../components/Home/Header";
import { Footer } from "../../components/Home/Footer";

export const BenevolesMissions = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios.get("/benevole/mes-benevoles")
      .then((res) => setMissions(res.data))
      .catch(console.error);
  }, []);

  return (
    <>
      <Header />
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-6">Bénévoles de mes missions</h1>

        {missions.length === 0 ? (
          <p className="text-gray-600">Aucune mission avec des bénévoles pour le moment.</p>
        ) : (
          missions.map((mission, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-3 text-green-700">{mission.mission}</h2>
              <ul className="space-y-2">
                {mission.benevoles.map((b) => (
                  <li key={b.id} className="bg-white shadow rounded p-4">
                    <p><strong>Nom :</strong> {b.nom} {b.prenom}</p>
                    <p><strong>Email :</strong> {b.email}</p>
                    <p><strong>Compétence :</strong> {b.competence}</p>
                    <p><strong>Ville :</strong> {b.ville}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </main>
      <Footer />
    </>
  );
};
