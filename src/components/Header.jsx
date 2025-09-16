import React from "react";

export default function Header() {
  const links = [
    { name: "Sobre", href: "#sobre" },
    { name: "Portfólio", href: "#portfolio" },
    { name: "Contato", href: "#contato" },
    { name: "Área da artista", href: "/admin" },
  ];

  return (
    <header className="bg-brand text-white px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-md gap-4">
      {/* Logo / Nome da artista */}
      <h1
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-xl md:text-2xl font-bold tracking-wide text-center md:text-left cursor-pointer hover:opacity-90 transition"
      >
        Minha Arte - Taty Salvatore
      </h1>

      {/* Navegação */}
      <nav>
        <ul className="flex flex-col md:flex-row gap-4 md:gap-8 text-base md:text-lg font-medium text-center md:text-left">
          {links.map((link) => (
            <li key={link.name} className="relative group">
              <a
                href={link.href}
                className="inline-block transition-colors duration-300 group-hover:text-gray-200"
              >
                {link.name}
                {/* underline animado */}
                <span className="block h-[2px] bg-white w-0 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
