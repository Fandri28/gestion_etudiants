"use client";

import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";
import { Sun, Moon } from "react-bootstrap-icons";
import { usePathname } from "next/navigation";

interface MenuItem {
    name: string;
    href: string;
    key: string;
}

export default function Navbar() {
    const { theme, toggle } = useTheme();
    const [mounted, setMounted] = useState(false);

    const [role, setRole] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const pathname = usePathname();
    const [showPopUp, setShowPopUp] = useState(false);

    useEffect(() => {
        setMounted(true);

        const storedRole = localStorage.getItem("userRole");
        const storedEmail = localStorage.getItem("userEmail");

        setRole(storedRole);
        setEmail(storedEmail);
        
    }, []);
    if (!mounted) return null;
    const firstLetter = email ? email.charAt(0).toUpperCase() : "";

    const handleLogout = () => {
        localStorage.removeItem("userRole");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

 
    // MENU SELON LE RÔLE
     
    const menuDefault: MenuItem[] = [{ name: "Login", href: "/login", key: "login" }];

    const menuAdmin: MenuItem[] = [
        { name: "Students", href: "/students", key: "students" },
        { name: "Absences", href: "/absences", key: "absences" },
        { name: "Matiere", href: "/matieres", key: "matieres" },
        { name: "Classe", href: "/classes", key: "classes" },
        { name: "Dashboard", href: "/dashboard", key: "dashboard" },
    ];

    const menuUser: MenuItem[] = [
        { name: "Students", href: "/students", key: "students" },
        { name: "Absences", href: "/absences", key: "absences" },
        { name: "Dashboard", href: "/dashboard", key: "dashboard" },
    ];

    let menu = menuDefault;
    if (role === "admin") menu = menuAdmin;
    if (role === "user") menu = menuUser;

    const breadcrumbMap: Record<string, string> = {
        "/": "Home",
        "/login": "Login",
        "/students": "Students",
        "/absences": "Absences",
        "/matieres": "Matiere",
        "/classes": "Classe",
        "/dashboard": "Dashboard",
    };
 
    const renderUserSection = () => {
        if (!mounted) return null;

        return (
            <div className="flex items-center gap-4">

                {/* MODE SOMBRE */}
                <button onClick={toggle} className="p-2 border rounded">
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                </button>

                {/* USER INFO */}
                {email && (
                    <div className="flex items-center gap-2 p-2 bg-gray-600 rounded">
                        <div className="w-6 h-6 bg-blue-500 flex items-center justify-center rounded-full font-bold">
                            {firstLetter}
                        </div>
                        <span className="text-xs">{email}</span>
                    </div>
                )}

                {/* LOGOUT */}
                {role && (
                    <button
                        onClick={handleLogout}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                    >
                        Logout
                    </button>
                )}
            </div>
        );
    };

    return (
        <>
            <nav className="w-full flex items-center justify-between p-4 text-[120%] shadow-sm bg-gray-700 text-white">

                {/* LOGO + MENU */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="font-bold text-white text-xl">
                        G.<span className="text-blue-400 italic">Absence</span>
                    </Link>

                    {menu.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`text-sm hover:text-blue-400 ${active ? "font-bold text-blue-400 underline" : "opacity-80"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                {renderUserSection()}
            </nav>

            {/* BREADCRUMB */}
            <div className=" bg-gray-500 text-sm py-2 px-4 flex gap-2 text-white">
                <Link href="/" className="hover:underline">Home</Link>
                {pathname !== "/" && (
                    <>
                        <span>/</span>
                        <span className="font-semibold ">{breadcrumbMap[pathname]}</span>
                    </>
                )}
            </div>
        </>
    );
}
