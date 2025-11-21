"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudentPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    niveau: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l’ajout");
      }

      alert("Étudiant ajouté avec succès !");
      router.push("/students");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center text-blue-600">
        Ajouter un étudiant
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Matricule */}
        <div>
          <label className="block mb-1 font-medium">Matricule</label>
          <input
            type="text"
            name="matricule"
            value={form.matricule}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block mb-1 font-medium">Nom</label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Prénom */}
        <div>
          <label className="block mb-1 font-medium">Prénom</label>
          <input
            type="text"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Niveau (select) */}
        <div>
          <label className="block mb-1 font-medium">Niveau</label>
          <select
            name="niveau"
            value={form.niveau}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full "
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
            name="email"
            value={form.email}
            onChange={handleChange}
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
            {loading ? "Enregistrement..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
