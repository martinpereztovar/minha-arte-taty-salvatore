import React from "react";

export default function Footer() {
  return (
    <footer className="bg-brand text-white py-6 mt-auto w-full">
      <div className="px-6 flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
        {/* Texto à esquerda */}
        <p className="text-sm">
          © {new Date().getFullYear()} Minha Arte - Taty Salvatore. Todos os
          direitos reservados.
        </p>

        {/* Links sociais à direita */}
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/taty_salvatore"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition relative group"
          >
            Instagram
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="mailto:contato@email.com"
            className="hover:text-gray-200 transition relative group"
          >
            Contato
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>
    </footer>
  );
}
