import React from "react";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { DonationForm } from "../components/Donation/DonationForm";
import { useLocation } from "react-router-dom";

export const Donation = () => {
  const { state: mission } = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <main className="flex-grow px-4 md:px-10 lg:px-24 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center text-primary">
            Donate to {mission?.title || "a Mission"}
          </h1>
          <DonationForm mission={mission} />
        </div>
      </main>
      <Footer />
    </div>
  );
};
