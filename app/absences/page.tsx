"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Absence {
  id: number;
  studentmatricule: string;
  matiere: string;
  date: string;
  date_debut?: string;
  date_fin?: string;
  type: string;
  justification: string;
  classe: string;
}

export default function AbsencesPage() {
  const [search, setSearch] = useState("");
  const [absences, setAbsences] = useState<Absence[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchAbsences() {
      const res = await fetch("/api/absences");
      const data = await res.json();
      setAbsences(data);
    }
    fetchAbsences();
  }, []);

  const filtered = absences.filter(
    (a) =>
      a.studentmatricule?.toLowerCase().includes(search.toLowerCase()) ||
      a.matiere?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: number) => {
    if (confirm("Supprimer cette absence ?")) {
      const res = await fetch(`/api/absences/${id}`, { method: "DELETE" });
      if (res.ok) setAbsences(absences.filter((a) => a.id !== id));
      else alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Liste des absences</h1>
        <button
          onClick={() => router.push("/absences/new")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-1"
        >
          <i className="bi bi-plus-lg"></i> Nouvelle absence
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Rechercher un étudiant ou une matière..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3 bg-amber-100 text-gray-800"
        />
      </div>

      {/* Tableau */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">Matricule</th>
            <th className="p-2 border">Matière</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Début</th>
            <th className="p-2 border">Fin</th>
            <th className="p-2 border">Classe</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Justification</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id} className="text-center">
              <td className="p-2 border">{a.studentmatricule}</td>
              <td className="p-2 border">{a.matiere}</td>
              <td className="p-2 border">{new Date(a.date).toLocaleDateString()}</td>
              <td className="p-2 border">{a.date_debut || "-"}</td>
              <td className="p-2 border">{a.date_fin || "-"}</td>
              <td className="p-2 border">{a.classe}</td>
              <td className="p-2 border">{a.type}</td>
              <td className="p-2 border">{a.justification}</td>
              <td className="p-2 border flex justify-center gap-2">
                <button
                  onClick={() => router.push(`/absences/${a.id}/edit`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded flex items-center gap-1"
                >
                  <i className="bi bi-pencil-fill"></i> Modifier
                </button>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1"
                >
                  <i className="bi bi-trash-fill"></i> Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
