import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Header } from "../components/Home/Header";
import { Footer } from "../components/Home/Footer";
import { useAuthContext } from "../hooks/useAuthContext";
import Discussion from '../components/chat/Discussion';

export const MissionDetails = () => {
  const location = useLocation();
  const mission = location.state;
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const token = user?.token;
  const [hasJoined, setHasJoined] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);

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
  }, [mission, user, token]);

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

      await axios.post(
        "http://localhost:8080/api/email/send",
        {
          to: user.email,
          subject: `Confirmation de participation - Mission ${mission.nom}`,
          content: `
            Bonjour ${user.prenom},
            
            Nous vous confirmons votre inscription à la mission "${mission.nom}".
            
            Détails de la mission :
            - Date : ${mission.date}
            - Lieu : ${mission.lieu}
            - Description : ${mission.description}
            
            Nous vous contacterons bientôt avec plus de détails sur l'organisation.
            
            Merci de votre engagement !
            L'équipe Charity
          `
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("🎉 Participation enregistrée ! Un email de confirmation vous a été envoyé.");
      setHasJoined(true);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mission Details Section */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div
                className="w-full h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${mission.image || "https://source.unsplash.com/800x600/?volunteer,charity"})` }}
              />
              <div className="p-6 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{mission.nom}</h1>
                  <p className="text-xl text-gray-600 mt-2">{mission.subtitle || "No subtitle provided."}</p>
                </div>

                <p className="text-gray-700 leading-relaxed">{mission.description}</p>

                <div className="flex justify-between text-sm text-gray-500">
                  <div>Lieu : {mission.lieu}</div>
                  <div>Date : {mission.date}</div>
                </div>

                <div>
                  <Progress
                    value={(mission.raised / mission.goal) * 100}
                    className="h-3 bg-gray-200"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Collecté : ${mission.raised?.toFixed(2) || "0.00"}</span>
                    <span>Objectif : ${mission.goal?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  {hasJoined ? (
                    <Button disabled className="bg-green-600 text-white">
                      Déjà rejoint
                    </Button>
                  ) : (
                    <Button
                      className="bg-green-600 text-white"
                      onClick={handleParticipate}
                    >
                      Rejoindre
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/donate/${mission.id}`, { state: mission })}
                  >
                    Faire un don
                  </Button>
                  <Button
                    variant={showDiscussion ? "secondary" : "outline"}
                    onClick={() => setShowDiscussion(!showDiscussion)}
                    className="lg:hidden"
                  >
                    {showDiscussion ? "Masquer la discussion" : "Voir la discussion"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion Section */}
          <div className={`lg:w-1/3 transition-all duration-300 ${showDiscussion ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-lg h-[800px]">
              <Discussion missionId={id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
