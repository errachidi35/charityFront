import React, { useState } from "react";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { Search } from "../components/Missions/Search";
import { MissionsGrid } from "../components/Missions/MissionsGrid";

export const Missions = () => {
  const [filters, setFilters] = useState({ keywords: "", location: "" });

  return (
    <>
      <Header />
      <main className="flex-grow">
        <section className="container py-12 text-center mx-auto">
          <h1 className="text-4xl font-bold">Lend us your hand</h1>
          <Search onSearch={setFilters} />
          <MissionsGrid filters={filters} />
        </section>
      </main>
      <Footer />
    </>
  );
};
