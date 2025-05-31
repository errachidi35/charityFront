import React, { useEffect, useState } from "react";
import { Header } from "../../components/Home/Header";
import { Footer } from "../../components/Home/Footer";
import { MissionsGrid } from "../../components/Missions/MissionsGrid";
import axios from "axios";
import { Link } from "react-router-dom";

export const MesMissions = () => {
  const [missions, setMissions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isMembre = user?.role === "MEMBRE";

 useEffect(() => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const currentUserId = currentUser?.id;

  axios.get("http://localhost:8080/api/mission/all")
  .then(response => {
    const allMissions = response.data;
    console.log("MISSIONS REÇUES :", allMissions); // ← REGARDE ICI
    const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

    const myMissions = allMissions.filter(
      (mission) => mission.responsable?.id === currentUserId
    );

    console.log("MISSIONS FILTRÉES :", myMissions);
    setMissions(myMissions);
  })
  .catch(error => console.error("Erreur lors du chargement des missions :", error));

}, []);


  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="container py-12 text-center mx-auto">
          <h1 className="text-4xl font-bold mb-6">Mes missions</h1>

          <div className="text-right mb-6 mr-6">
            <Link
              to="/createmission"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded shadow"
            >
              Créer une mission
            </Link>
             <Link
    to="/missions-table"
    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
  >
    Vue tableau
  </Link>
          </div>

          {missions.length === 0 ? (
            <p className="text-gray-600 mt-4">Aucune mission créée pour le moment.</p>
          ) : (
            <MissionsGrid filters={{ keywords: "", location: "" }} missions={missions} />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};
