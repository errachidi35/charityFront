import React from "react";

import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { DonationSection } from "../components/Donation/SideBar";


import { useLocation } from "react-router-dom";

export const Donation = () => {
  const location = useLocation();
  const mission = location.state || {};

  return (
    <div className="flex flex-col w-full bg-white">
      <Header />

      

      <main className="w-full px-[72px] py-10">
        <h1 className="font-bold text-[50px] text-center text-black tracking-[0] leading-normal">
          {mission.title || "Donation Page"}
        </h1>
        
      </main>
      <DonationSection />
      <Footer />
    </div>
  );
};

