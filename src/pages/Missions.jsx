import React, { useEffect, useState } from "react";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { Search } from "../components/Missions/Search";
import { MissionsGrid } from "../components/Missions/MissionsGrid";
import axios from "axios";

export const Missions = () => {
  const [filters, setFilters] = useState({ keywords: "", location: "" });
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/mission/all")
      .then(response => setMissions(response.data))
      .catch(error => console.error("Erreur lors du chargement des missions :", error));
  }, []);

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="container py-12 text-center mx-auto">
          <h1 className="text-4xl font-bold mb-6">Lend us your hand</h1>
          <Search onSearch={setFilters} />
          <MissionsGrid filters={filters} missions={missions} />
        </section>
      </main>
      <Footer />
    </>
  );
};
