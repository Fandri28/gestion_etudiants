"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStudentPage() {
  const { matricule } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    niveau: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger les infos de l’étudiant à modifier
    async function fetchStudent() {
      const res = await fetch(`/api/students/${matricule}`);
      const data = await res.json();
      setFormData({
        matricule: data.matricule,
        nom: data.nom,
        prenom: data.prenom,
        niveau: data.niveau,
        email: data.email,
      });
    }
    fetchStudent();
  }, [matricule]);

  async function updateStudent(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    await fetch(`/api/students/${matricule}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setLoading(false);
    alert("Étudiant modifié avec succès !");
    router.push("/students");
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-600">
        Modifier un étudiant
      </h1>

      <form onSubmit={updateStudent} className="space-y-4">
        {/* Matricule (désactivé) */}
        <div>
          <label className="block mb-1 font-medium">Matricule</label>
          <input
            type="text"
            value={formData.matricule}
            disabled
            className="border p-2 rounded w-full bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input
            type="text"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Prénom */}
        <div>
          <label className="block mb-1 font-medium">Prénom</label>
          <input
            type="text"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Niveau (select) */}
        <div>
          <label className="block mb-1 font-medium">Niveau</label>
          <select
            value={formData.niveau}
            onChange={(e) => setFormData({ ...formData, niveau: e.target.value })}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">-- Sélectionner un niveau --</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
            <option value="L3">L3</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
          </select>
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => router.push("/students")}
            className="px-4 py-2 border rounded hover:bg-gray-500 transition"
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            {loading ? "Mise à jour..." : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
