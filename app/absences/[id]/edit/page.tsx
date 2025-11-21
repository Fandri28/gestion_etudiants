"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface Student { matricule: string; }
interface Matiere { nom: string; code: string }
interface Classe { id: number; nom_classe: string; }

export default function EditAbsenceForm() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [form, setForm] = useState({
    studentmatricule: "",
    matiere: "",
    date: "",
    date_debut: "",
    date_fin: "",
    justification: "",
    type: "",
    classe: "",
  });

  const [students, setStudents] = useState<Student[]>([]);
  const [matieres, setMatieres] = useState<Matiere[]>([]);
  const [classes, setClasses] = useState<Classe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Charger étudiants, matières et classes
        const [studentsRes, matieresRes, classesRes] = await Promise.all([
          fetch("/api/students"),
          fetch("/api/matieres"),
          fetch("/api/classes")
        ]);
        setStudents((await studentsRes.json()).students || []);
        setMatieres((await matieresRes.json()).matieres || []);
        setClasses((await classesRes.json()).classes || []);

        // Charger l'absence existante
        if (id) {
          const res = await fetch(`/api/absences/${id}`);
          const data = await res.json();
          setForm({
            studentmatricule: data.studentmatricule,
            matiere: data.matiere,
            date: data.date.split("T")[0],
            date_debut: data.date_debut || "",
            date_fin: data.date_fin || "",
            justification: data.justification,
            type: data.type,
            classe: data.classe,
          });
        }
      } catch (err: any) {
        console.error(err);
        setError("Erreur lors du chargement des données");
      }
    }
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/absences/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la modification");
      alert("Absence modifiée !");
      router.push("/absences");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Modifier l'absence</h1>

      {error && <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Student */}
        <div>
          <label className="block mb-1 font-medium">Matricule étudiant</label>
          <select name="studentmatricule" value={form.studentmatricule} onChange={handleChange} required className="border p-2 rounded w-full">
            <option value="">Sélectionner un étudiant</option>
            {students.map(s => <option key={s.matricule} value={s.matricule}>{s.matricule}</option>)}
          </select>
        </div>

        {/* Matiere */}
        <div>
          <label className="block mb-1 font-medium">Matière</label>
          <select name="matiere" value={form.matiere} onChange={handleChange} required className="border p-2 rounded w-full">
            <option value="">Sélectionner une matière</option>
            {matieres.map(m => <option key={m.code} value={m.nom}>{m.nom}</option>)}
          </select>
        </div>
        
        {/* Classe */}
        <div>
          <label className="block mb-1 font-medium">Classe</label>
          <select name="classe" value={form.classe} onChange={handleChange} required className="border p-2 rounded w-full">
            <option value="">Sélectionner une classe</option>
            {classes.map(c => <option key={c.id} value={c.nom_classe}>{c.nom_classe}</option>)}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required className="border p-2 rounded w-full" />
        </div>

        {/* Heure début */}
        <div>
          <label className="block mb-1 font-medium">Heure de début</label>
          <TimePicker
            onChange={(value) => setForm({ ...form, date_debut: value || "" })}
            value={form.date_debut}
            disableClock={true}
            clearIcon={null}
            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
          />
        </div>

        {/* Heure fin */}
        <div>
          <label className="block mb-1 font-medium">Heure de fin</label>
          <TimePicker
            onChange={(value) => setForm({ ...form, date_fin: value || "" })}
            value={form.date_fin}
            disableClock={true}
            clearIcon={null}
            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 p-1"
          />
        </div>

        {/* Justification */}
        <div>
          <label className="block mb-1 font-medium">Justification</label>
          <input type="text" name="justification" value={form.justification} onChange={handleChange} className="border p-2 rounded w-full" />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type d'absence</label>
          <select name="type" value={form.type} onChange={handleChange} required className="border p-2 rounded w-full">
            <option value="">Sélectionner le type</option>
            <option value="Retard">Retard</option>
            <option value="Absence">Absence</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button type="button" onClick={() => router.push("/absences")} className="px-4 py-2 border rounded hover:bg-gray-500">Annuler</button>
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">{loading ? "Enregistrement..." : "Modifier"}</button>
        </div>
      </form>
    </div>
  );
}
