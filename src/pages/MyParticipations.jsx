import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { toast } from "sonner";

export const MyParticipations = () => {
  const [participations, setParticipations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8080/api/participation/benevole/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setParticipations(res.data))
      .catch((err) => {
        toast.error("Erreur lors du chargement des participations");
        console.error(err);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Mes Participations</h1>
      {participations.length === 0 ? (
        <p className="text-center text-gray-500">Aucune participation enregistrée.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {participations.map((p) => (
            <Card key={p.id} className="overflow-hidden border shadow-md">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {p.mission.nom}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {p.mission.description}
                </p>
                <div className="flex items-center gap-3 mb-2">
                  <Badge variant="outline">
                    <CalendarIcon className="w-4 h-4 mr-1" /> {p.mission.date}
                  </Badge>
                  <Badge variant="outline">
                    <MapPinIcon className="w-4 h-4 mr-1" /> {p.mission.lieu}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-3 bg-gray-50 text-sm text-gray-500">
                Inscrit le {p.dateInscription}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
