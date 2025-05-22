import React, { useEffect, useState } from "react";
import axios from "axios";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent, CardFooter } from "../../ui/card";
import { Progress } from "../../ui/progress";
import { toast } from "sonner";
import { useAuthContext } from "../../../hooks/useAuthContext";

export const MissionsGrid = ({ filters }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [participatedMissionIds, setParticipatedMissionIds] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const token = user?.token;
  console.log("token", token);

  // Remplacer la fonction fetchParticipations existante
const fetchParticipations = async () => {
  try {
    if (!user?.id || !token) {
      console.log("No user or token available");
      return;
    }

    // Récupérer toutes les missions d'abord
    const missionsRes = await axios.get("http://localhost:8080/api/mission/all");
    const allMissions = missionsRes.data;
    
    // Pour chaque mission, vérifier la participation
    const participationChecks = await Promise.all(
      allMissions.map(async (mission) => {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/participation/check/${mission.id}`,
            {
              headers: { 
                Authorization: `Bearer ${token}` 
              }
            }
          );
          return res.data ? mission.id : null;
        } catch (err) {
          console.error(`Error checking participation for mission ${mission.id}:`, err);
          return null;
        }
      })
    );

    // Filtrer les IDs null et mettre à jour l'état
    const participatedIds = participationChecks.filter(id => id !== null);
    console.log("Participations trouvées:", participatedIds);
    setParticipatedMissionIds(participatedIds);
    
  } catch (err) {
    console.error("Erreur lors de la vérification des participations:", err);
  }
};





  useEffect(() => {
    axios
      .get("http://localhost:8080/api/mission/all")
      .then((response) => {
        setMissions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des missions:", error);
        setLoading(false);
      });
  }, []);

 // Mettre à jour le useEffect
  useEffect(() => {
    if (user?.id && user?.role === "BENEVOLE" && token) {
      console.log("Vérification des participations pour le bénévole:", user.id);
      fetchParticipations();
    }
  }, [user, token]);

  const handleParticipate = async (missionId) => {
    if (!user || user.role !== "BENEVOLE") {
      return toast.error("❌ Vous devez être connecté en tant que bénévole.");
    }

    try {
      await axios.post(
        "http://localhost:8080/api/mission/participate",
        { idMission: missionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"

          },
        }
      );

      toast.success("🎉 Participation enregistrée !");
      fetchParticipations();
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

  const handleDonateClick = (mission) => {
    navigate(`/donate/${mission.id}`, { state: mission });
  };

  const filteredMissions = missions.filter((mission) => {
    const matchesKeyword =
      !filters.keywords ||
      mission.nom.toLowerCase().includes(filters.keywords.toLowerCase());
    const matchesLocation =
      !filters.location ||
      mission.lieu.toLowerCase().includes(filters.location.toLowerCase());
    return matchesKeyword && matchesLocation;
  });

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredMissions.length > 0 ? (
        filteredMissions.map((mission) => (
          <Card key={mission.id} className="overflow-hidden border-none shadow-md">
            <div className="relative h-48 bg-gray-200">
              <img
                src="https://source.unsplash.com/800x600/?volunteer,charity"
                alt={mission.nom}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{mission.nom}</h3>
              <p className="text-gray-600 text-sm mb-4">{mission.subtitle}</p>
              <div className="mb-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Collecté: ${mission.raised?.toFixed(2) || "0.00"}</span>
                  <span>Objectif: ${mission.goal?.toFixed(2) || "0.00"}</span>
                </div>
                <Progress
                  value={
                    typeof mission.raised === "number" &&
                    typeof mission.goal === "number" &&
                    mission.goal > 0
                      ? Math.min((mission.raised / mission.goal) * 100, 100)
                      : 0
                  }
                  className="h-2 bg-gray-200"
                />
              </div>
              <div className="text-sm text-gray-500 mt-4">
                {mission.nbParticipants > 0 ? (
                  <span>{mission.nbParticipants} Participants</span>
                ) : (
                  <span>Be the first to join!</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 px-6 py-3 flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="flex items-center gap-1 rounded-full">
                  <CalendarIcon className="h-3 w-3" />
                  <span>{mission.date}</span>
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 rounded-full">
                  <MapPinIcon className="h-3 w-3" />
                  <span>{mission.lieu}</span>
                </Badge>
              </div>
              <div className="flex justify-between w-full">
                <div className="flex space-x-2">

                    {participatedMissionIds.includes(mission.id) ? (
    <Button 
      disabled 
      size="sm" 
      className="text-xs bg-green-500 hover:bg-green-500 text-white cursor-not-allowed"
    >
      Joined
    </Button>
  ) : (
    <Button
      variant="outline"
      size="sm"
      className="text-xs"
      onClick={() => handleParticipate(mission.id)}
    >
      Volunteer
    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleDonateClick(mission)}
                  >
                    Donate
                  </Button>
                </div>
                <Button variant="outline" size="sm" className="text-xs">
                  See more
                </Button>
              </div>
              <Button
  className="w-full bg-black text-white hover:bg-gray-800"
  onClick={() => navigate(`/mission/${mission.id}`, { state: mission })}
>
  VIEW DETAILS
</Button>

            </CardFooter>
          </Card>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No missions found.</p>
      )}
    </div>
  );
};
