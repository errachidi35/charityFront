import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Home/Header";
import { Footer } from "../../components/Home/Footer";
import axios from "axios";

export const CreateMission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    lieu: "",
    description: "",
    subtitle: "",
    nbParticipants: 0,
    type: "",
    goal: ""
  });

  const handleChange = (e) => {
  const { name, value } = e.target;
  const parsedValue = name === "nbParticipants" ? parseInt(value) :
                      name === "goal" ? parseFloat(value) :
                      value;
  setFormData({ ...formData, [name]: parsedValue });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("user"))?.token;
    try {
      await axios.post("http://localhost:8080/api/mission/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/missions");
    } catch (err) {
      console.error("Erreur lors de la création de la mission :", err?.response?.data || err.message);
      alert("Erreur lors de la création. Vérifie que tous les champs sont bien remplis.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header />
      <main className="flex-grow px-4 md:px-10 lg:px-24 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Créer une mission</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Lieu</label>
              <input
                type="text"
                name="lieu"
                value={formData.lieu}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Sous-titre</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Nombre de participants</label>
              <input
                type="number"
                name="nbParticipants"
                min="0"
                value={formData.nbParticipants}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div>
  <label className="block text-sm font-medium">Type de mission</label>
  <select
    name="type"
    value={formData.type}
    onChange={handleChange}
    required
    className="w-full border border-gray-300 rounded px-3 py-2"
  >
    <option value="">-- Choisir un type --</option>
    <option value="DISALIMENT">Distribution d’aliments</option>
    <option value="NETTESPPUB">Nettoyage espace public</option>
    <option value="COLLECTALIMENT">Collecte alimentaire</option>
    <option value="COLLECTEFIN">Collecte financière</option>
    <option value="SOCIALE">Sociale</option>
    <option value="ENVIRONNEMENTALE">Environnementale</option>
    <option value="EDUCATIVE">Éducative</option>
    <option value="CULTURELLE">Culturelle</option>
    <option value="SANITAIRE">Sanitaire</option>
    <option value="HUMANITAIRE">Humanitaire</option>
    <option value="AUTRE">Autre</option>
  </select>
</div>

            <div>
              <label className="block text-sm font-medium">Objectif (€)</label>
              <input
                type="number"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
              >
                Créer
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};
