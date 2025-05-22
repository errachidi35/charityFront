import React, { useState } from "react";
import axios from "axios";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { Progress } from "../../ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const DonationForm = ({ mission: initialMission }) => {
  const [nomDonateur, setNomDonateur] = useState("");
  const [montant, setMontant] = useState("");
  const [moyenPaiement, setMoyenPaiement] = useState("CARTE");
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState(initialMission);
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nomDonateur || !montant || !mission) return;

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/mission/donate", {
        nomDonateur,
        montant: parseFloat(montant),
        moyenPaiement,
        missionId: mission.id,
      });

      // Mise à jour de la mission avec les nouvelles données (raised)
      setMission(res.data);

      toast.success("🎉 Merci pour votre don généreux !");
      setNomDonateur("");
      setMontant("");
      setTimeout(() => {
  navigate("/missions");
}, 2000); // redirige après 2s pour laisser voir le toast

    } catch (error) {
      console.error("Donation error:", error);
      toast.error("Une erreur s'est produite lors de la donation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-8 space-y-8 border border-gray-200">
      <div className="space-y-3">
        <h2 className="text-xl font-bold">Progression de la Mission</h2>
        <Progress 
  value={
    typeof mission.raised === "number" && typeof mission.goal === "number" && mission.goal > 0
      ? Math.min((mission.raised / mission.goal) * 100, 100)
      : 0
  }
  className="h-4"
/>

<div className="flex justify-between text-sm text-gray-600">
  <span>Collecté : ${mission.raised?.toFixed(2) || "0.00"}</span>
  <span>Objectif : ${mission.goal?.toFixed(2) || "0.00"}</span>
</div>


      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Votre nom</label>
          <Input
            placeholder="ex: John Doe"
            value={nomDonateur}
            onChange={(e) => setNomDonateur(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Montant ($)</label>
          <Input
            type="number"
            placeholder="ex: 50"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Méthode de paiement</label>
          <RadioGroup value={moyenPaiement} onValueChange={setMoyenPaiement} className="flex gap-6">
            <label className="flex items-center gap-2">
              <RadioGroupItem value="CARTE" />
              Carte
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem value="PAYPAL" />
              PayPal
            </label>
            <label className="flex items-center gap-2">
              <RadioGroupItem value="VIREMENT" />
              Virement
            </label>
          </RadioGroup>
        </div>

        <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
          {loading ? "Traitement en cours..." : "Faire un don"}
        </Button>
      </form>
    </div>
  );
};
