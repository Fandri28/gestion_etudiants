"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Student {
  matricule: string;
  nom: string;
  prenom: string;
  niveau: string;
  email: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(5);
  const router = useRouter();

  async function fetchStudents() {
    const res = await fetch(`/api/students?search=${search}&page=${page}&limit=${limit}`);
    const data = await res.json();
    setStudents(data.students);
    setTotal(data.total);
  }

  useEffect(() => {
    fetchStudents();
  }, [search, page]);

  async function deleteStudent(matricule: string) {
    if (confirm("Supprimer cet étudiant ?")) {
      await fetch(`/api/students/${matricule}`, { method: "DELETE" });
      fetchStudents();
    }
  }

  return (
    <div className="p-6">
      {/* En-tête */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gestion des étudiants</h1>
        <button
          onClick={() => router.push("/students/new")}

          className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-2 rounded flex items-center gap-1 "
        >
          <i className="bi bi-plus-lg"></i>
          Ajouter un étudiant
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="flex items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
      </div>

      {/* Tableau */}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">Matricule</th>
            <th className="p-2 border">Nom</th>
            <th className="p-2 border">Prénom</th>
            <th className="p-2 border">Niveau</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.matricule} className="text-center border-b">
              <td className="p-2 border">{s.matricule}</td>
              <td className="p-2 border">{s.nom}</td>
              <td className="p-2 border">{s.prenom}</td>
              <td className="p-2 border">{s.niveau}</td>
              <td className="p-2 border">{s.email}</td>
              <td className="p-2 border flex justify-center gap-2">
                {/* 🔴 Supprimer */}
                <button
                  onClick={() => deleteStudent(s.matricule)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1"
                >
                  <i className="bi bi-trash-fill"></i> Supprimer
                </button>

                {/* ✏️ Modifier */}
                <button
                  onClick={() => router.push(`/students/edit/${s.matricule}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded flex items-center gap-1"
                >
                  <i className="bi bi-pencil-fill"></i> Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>  

     
    </div>
  );
}

