"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Classe = { id: number; nom_classe: string };

export default function ClassesPage() {
  const [classes, setClasses] = useState<Classe[]>([]);
  const [form, setForm] = useState({ nom_classe: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // 🔹 Charger les classes
  const fetchClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data.classes || []);
  };

  useEffect(() => {
    fetchClasses();

    const role = localStorage.getItem("userRole");

    if (!role || role !== "admin") {
      alert("⛔ Vous n'avez pas l'autorisation d'accéder à cette page.");

      router.push("/");

    }
  }, []);

  // 🔹 Ajouter ou modifier
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await fetch(`/api/classes/${editingId}`, {
        method: "PUT",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      setEditingId(null);
    } else {
      await fetch("/api/classes", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
    }
    setForm({ nom_classe: "" });
    fetchClasses();
  };

  // 🔹 Modifier
  const handleEdit = (classe: Classe) => {
    setForm({ nom_classe: classe.nom_classe });
    setEditingId(classe.id);
  };

  // 🔹 Supprimer
  const handleDelete = async (id: number) => {
    if (confirm("Supprimer cette classe ?")) {
      await fetch(`/api/classe/${id}`, { method: "DELETE" });
      fetchClasses();
    }
  };

  // 🔹 Filtrer selon recherche
  const filteredClasses = classes.filter((c) =>
    c.nom_classe.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gestion des Classes</h1>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Rechercher une classe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* Formulaire */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-6 border-gray-300 rounded-lg p-4"
      >
        <input
          type="text"
          placeholder="Nom de la classe"
          value={form.nom_classe}
          onChange={(e) => setForm({ nom_classe: e.target.value })}
          className="border border-gray-300 p-2 rounded w-1/3"
          required
        />

        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${editingId
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {editingId ? "Modifier" : "Ajouter"}
        </button>
      </form>

      {/* Tableau */}
      <div className="flex justify-center">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead>
            <tr>
              <th className="p-2 border">Nom de la classe</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClasses.map((c) => (
              <tr key={c.id} className="text-center border-b hover:bg-gray-500">
                <td className="p-2 border">{c.nom_classe}</td>

                <td className="p-2 flex justify-center gap-2">
                  {/* ✏️ Modifier */}
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 p-2 hover:bg-yellow-600  rounded flex items-center gap-1"
                  >
                    <i className="bi bi-pencil-fill"></i> Modifier
                  </button>

                  {/* 🗑 Supprimer */}
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="bg-red-500 p-2 hover:bg-red-600 text-white rounded flex items-center gap-1"
                  >
                    <i className="bi bi-trash-fill"></i> Supprimer
                  </button>
                </td>
              </tr>
            ))}

            {filteredClasses.length === 0 && (
              <tr>
                <td colSpan={2} className="text-center p-4">
                  Aucune classe trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
