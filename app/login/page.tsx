"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log(data);


            if (!res.ok) throw new Error(data.error || "Erreur lors de la connexion");

            // Stocker les informations de l'utilisateur
            localStorage.setItem("user", JSON.stringify(data.user));
            console.log("User role:", data.user.role);
            localStorage.setItem("userRole", data.user.role);
            localStorage.setItem("userEmail", data.user.email);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
            // Redirection après login
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
            console.log(form);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex items-center justify-center  p-4">
            <div className="bg-gray-800 text-white rounded-2xl shadow-xl max-w-md w-full p-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Connexion</h1>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-400 rounded p-3 mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-200">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="email"
                            placeholder="votre.email@exemple.com"
                            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-200">Mot de passe</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            placeholder="••••••••"
                            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-300">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-blue-500" /> Se souvenir de moi
                        </label>
                        <button
                            type="button"
                            className="hover:underline text-blue-400"
                            onClick={() => alert("Redirection mot de passe oublié")}
                        >
                            Mot de passe oublié ?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                        {loading ? "Connexion..." : "Se connecter"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    Pas encore de compte ?{" "}
                    <a href="/login/signup" className="text-blue-400 hover:underline">
                        Inscrivez-vous
                    </a>
                </p>
            </div>
        </div>
    );
}
