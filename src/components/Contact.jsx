import React from "react";

export default function Contact() {
  return (
    <section
      id="contato"
      className="bg-white px-6 md:px-16 py-12 md:py-20 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
        Contato
      </h2>
      <p className="text-gray-700 max-w-2xl mx-auto mb-8">
        Gostou do trabalho da Taty Soalvatore? Entre em contato para encomendas,
        colaborações ou apenas para trocar ideias sobre arte!
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        {/* Email */}
        <a
          href="mailto:tatysalvatore@email.com"
          className="px-6 py-3 bg-brand text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Enviar Email
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/taty_salvatore"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gray-800 text-white rounded-lg shadow hover:opacity-90 transition"
        >
          Instagram
        </a>
      </div>
    </section>
  );
}
