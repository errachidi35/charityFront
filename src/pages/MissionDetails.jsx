import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { useAuthContext } from "../hooks/useAuthContext"; // ✅ assure-toi que le chemin est correct

export const MissionDetails = () => {
  const location = useLocation();
  const mission = location.state;
  const navigate = useNavigate();

  // ✅ Toujours appeler les hooks ici, avant toute condition
  const { user } = useAuthContext();
  const token = user?.token;
  const [hasJoined, setHasJoined] = useState(false);

  useEffect(() => {
    const checkIfUserHasJoined = async () => {
      if (!user || user.role !== "BENEVOLE") return;

      try {
        const res = await axios.get(
          `http://localhost:8080/api/participation/benevole/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const ids = res.data.map((p) => p.mission.id);
        setHasJoined(ids.includes(mission.id));
      } catch (err) {
        console.error("Erreur vérification participation:", err);
      }
    };

    if (mission) checkIfUserHasJoined();
  }, [mission, user, token]); // ✅ ajout de `token` dans les dépendances

  const handleParticipate = async () => {
  if (!user || user.role !== "BENEVOLE") {
    toast.error("❌ Vous devez être connecté en tant que bénévole.");
    return;
  }

  if (hasJoined) {
    toast.error("❌ Vous avez déjà participé à cette mission.");
    return;
  }

  try {
    await axios.post(
      "http://localhost:8080/api/mission/participate",
      { idMission: mission.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    toast.success("🎉 Participation enregistrée !");
    setHasJoined(true); // 🟩 mise à jour de l'état local
  } catch (error) {
    let message = "❌ Une erreur est survenue pendant l'inscription.";
    if (typeof error.response?.data === "string") {
      message = error.response.data;
    } else if (typeof error.response?.data?.message === "string") {
      message = error.response.data.message;
    }
    toast.error(message);
    console.error(error);
  }
};


  if (!mission) return <p>Loading...</p>;



  return (
    <>
      <Header />
      <section className="flex flex-wrap justify-center gap-6 py-10 px-4 md:px-[72px] w-full">
        {/* Left section with image and content */}
        <div className="flex flex-col max-w-[856px] w-full">
          <div
            className="w-full h-[560px] rounded-[20px] bg-cover bg-center mb-6"
            style={{ backgroundImage: `url(${mission.image || "https://source.unsplash.com/800x600/?volunteer,charity"})` }}
          />

          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-bold text-gray-900">{mission.nom}</h1>
            <p className="text-xl text-gray-600">{mission.subtitle || "No subtitle provided."}</p>
            <p className="text-base text-gray-700 leading-relaxed">{mission.description}</p>

            <div className="flex justify-between mt-4">
              <div className="text-sm text-gray-500">Lieu : {mission.lieu}</div>
              <div className="text-sm text-gray-500">Date : {mission.date}</div>
            </div>

            <div className="my-4">
              <Progress
                value={(mission.raised / mission.goal) * 100}
                className="h-3 bg-gray-200"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Collecté : ${mission.raised?.toFixed(2) || "0.00"}</span>
                <span>Objectif : ${mission.goal?.toFixed(2) || "0.00"}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
  {hasJoined ? (
    <Button disabled className="bg-green-600 text-white">
      Joined
    </Button>
  ) : (
    <Button
      className="bg-green-600 text-white"
      onClick={handleParticipate} // 🟩 ICI
    >
      Volunteer
    </Button>
  )}
  <Button
    variant="outline"
    onClick={() => navigate(`/donate/${mission.id}`, { state: mission })}
  >
    Donate
  </Button>
</div>


          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};
