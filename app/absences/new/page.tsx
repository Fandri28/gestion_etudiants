"use client";
import TimePicker from 'react-time-picker';
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css"; // nécessaire pour l’horloge


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Student {
  matricule: string;
}

interface Matiere {
  code: string;
  nom: string;
}
interface Classe {
  id: number;
  nom_classe: string;
}

export default function AddAbsenceForm() {
  const router = useRouter();

  const [form, setForm] = useState({
  studentmatricule: "",
  matiere: "",
  date: "",
  date_debut: "", // ajouté
  date_fin: "",   // ajouté
  classe: "",
  justification: "",
  type: "",
});


  const [students, setStudents] = useState<Student[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Charger les étudiants et matières depuis l'API
  useEffect(() => {
    async function fetchData() {
      try {
        const matieresRes = await fetch("/api/matieres");
        const matieresData = await matieresRes.json();
        setMatieres(matieresData.matieres || []);

        const studentsRes = await fetch("/api/students");
        const studentsData = await studentsRes.json();
        setStudents(studentsData.students || []);
        
        const classesRes = await fetch("/api/classes");
        const classesData = await classesRes.json();
        setClasses(classesData.classes || []);

      } catch (err: any) {
        console.error("Erreur fetch students/matieres:", err.message);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/absences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de l'ajout de l'absence");

      alert("Absence ajoutée avec succès !");
      router.push("/absences");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Ajouter une absence</h1>

      {error && <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select étudiant */}
        <div>
          <label className="block mb-1 font-medium">Matricule étudiant</label>
          <select
            name="studentmatricule"
            value={form.studentmatricule}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option className="text-black" value="">Sélectionner un étudiant</option>
            {students.map((s) => (
              <option key={s.matricule} value={s.matricule}>
                {s.matricule}
              </option>
            ))}
          </select>
        </div>

        {/* Select matière */}
        <div>
          <label className="block mb-1 font-medium">Matière</label>
          <select
            name="matiere"
            value={form.matiere}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Sélectionner une matière</option>
            {matieres.map((m) => (
              <option className="text-black" key={m.code} value={m.nom}>
                {m.nom}
              </option>
            ))}
          </select>
        </div>
        {/* Select classe */}
        <div>
          <label className="block mb-1 font-medium">Classe</label>
          <select
            name="classe"
            value={form.classe}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Sélectionner une classe</option>
            {classes.map((c) => (
              <option className="text-black" key={c.id} value={c.nom_classe}>
                {c.nom_classe}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>
        
        {/* Heure de début */}
 {/* Heure de début */}
<div>
  <label className="block mb-1 font-medium">Heure de début</label>
  <input
    type="time"
    name="date_debut"
    value={form.date_debut}
    onChange={handleChange}
    className="border p-2 rounded w-full"
  />
</div>

{/* Heure de fin */}
<div>
  <label className="block mb-1 font-medium">Heure de fin</label>
  <input
    type="time"
    name="date_fin"
    value={form.date_fin}
    onChange={handleChange}
    className="border p-2 rounded w-full"
  />
</div>


        {/* Justification */}
        <div>
          <label className="block mb-1 font-medium">Justification</label>
          <input
            type="text"
            name="justification"
            value={form.justification}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Type d'absence */}
        <div>
          <label className="block mb-1 font-medium">Type d'absence</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Sélectionner le type</option>
            <option value="Retard">Retard</option>
            <option value="Absence">Absence</option>
          </select>
        </div>

        {/* Boutons */}
        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push("/absences")} className="px-4 py-2 border rounded hover:bg-gray-500">
            Annuler
          </button>

          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2">
            {loading ? "Enregistrement..." : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
}
