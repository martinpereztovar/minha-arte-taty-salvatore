import React from "react";
import heroImage from "../assets/hero-image.jpeg"; // substitua pelo nome real da imagem

export default function Hero() {
  return (
    <section
      id="hero"
      className="bg-gray-50 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 py-12 md:py-20"
    >
      {/* Texto */}
      <div className="text-center md:text-left max-w-lg">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
          Arte que transforma <br />
          <span className="text-brand">traços</span> em emoções
        </h2>
        <p className="mt-6 text-lg text-gray-700">
          Conheça o portfólio de Taty Salvatore e mergulhe em suas criações a
          lápis.
        </p>
        <div className="mt-8 flex justify-center md:justify-start gap-4">
          <a
            href="#portfolio"
            className="bg-brand text-white px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Ver Portfólio
          </a>
          <a
            href="#contato"
            className="border-2 border-brand text-brand px-6 py-3 rounded-lg hover:bg-brand hover:text-white transition"
          >
            Contato
          </a>
        </div>
      </div>

      {/* Imagem */}
      <div className="flex justify-center md:justify-end mb-8 md:mb-0">
        <img
          src={heroImage}
          alt="Arte de Taty Souza"
          className="w-64 md:w-96 rounded-xl shadow-lg transition duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105"
        />
      </div>
    </section>
  );
}
