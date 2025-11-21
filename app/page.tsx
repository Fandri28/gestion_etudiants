"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role === "user" || role === "admin") {
      setIsLogged(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center text-white p-6">
      <div className="text-center max-h-4xl border-transparent rounded-2xl p-10 bg-gradient-to-b from-gray-900 to-blue-700">
        <Link href="/" className="font-bold text-white text-5xl inline-block m-3">
          <span className="relative -top-2">G.</span>
          <span className="relative text-blue-400 italic -bottom-1">Absence</span>
        </Link>

        <h1 className="text-4xl font-bold mb-4">WELCOME</h1>

        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Ceci est la plateforme de gestion des absences des étudiants.
          Cliquez sur le bouton ci-dessous pour continuer.
        </p>

        {isLogged ? (
          <a
            href="/dashboard"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
          >
            DASHBOARD
          </a>
        ) : (
          <a
            href="/login"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow-md hover:bg-gray-200 transition"
          >
            LOG IN
          </a>
        )}
      </div>

      <div className="bg-white py-12 rounded-2xl gap-2 mt-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
    
    {/* Suivi précis des absences */}
    <div>
      <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
        <i className="bi bi-clipboard-data text-blue-500 text-3xl"></i>
      </div>
      <h3 className="text-gray-900 text-xl font-semibold mb-2">Suivi précis des absences</h3>
      <p className="text-gray-600">
        Enregistrement rapide des absences avec justification et type.
      </p>
    </div>

    {/* Communication simplifiée */}
    <div>
      <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
        <i className="bi bi-chat-dots text-blue-500 text-3xl"></i>
      </div>
      <h3 className="text-gray-900 text-xl font-semibold mb-2">Communication simplifiée</h3>
      <p className="text-gray-600">
        Partage instantané des informations entre enseignants et administration.
      </p>
    </div>

    {/* Analyse et statistiques */}
    <div>
      <div className="bg-blue-100 p-4 rounded-full inline-block mb-4">
        <i className="bi bi-graph-up text-blue-500 text-3xl"></i>
      </div>
      <h3 className="text-gray-900 text-xl font-semibold mb-2">Analyse et statistiques</h3>
      <p className="text-gray-600">
        Visualisation des taux d’absences et identification des étudiants à risque.
      </p>
    </div>

  </div>
</div>

    </div>
  );
}
