import React from "react";
import aboutImage from "../assets/about-image.jpeg"; // substitua pelo nome real do arquivo depois

export default function About() {
  return (
    <section id="sobre" className="bg-white px-4 md:px-16 py-12 md:py-20">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
        {/* Imagem */}
        <div className="flex-shrink-0">
          <img
            src={aboutImage}
            alt="Foto de Taty Salvatore"
            className="w-64 md:w-80 rounded-xl shadow-lg transition duration-500 ease-in-out transform hover:shadow-2xl hover:scale-105"
          />
        </div>

        {/* Texto */}
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Sobre <span className="text-brand">Taty Salvatore</span>
          </h2>
          <p className="text-lg leading-relaxed text-gray-700">
            Taty Salvatore é uma desenhista cearense, artista LGBT, apaixonada
            por filmes, livros e games. Em seus trabalhos, dá vida a personagens
            literários, compartilha fragmentos de suas próprias histórias,
            traduz sentimentos íntimos e homenageia artistas e personagens que
            marcaram sua trajetória e a influenciam continuamente.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mt-4">
            Sua arte carrega um toque muito pessoal: a maioria de seus desenhos
            é feita a lápis, em preto e branco, revelando a força da forma e do
            traço sem depender da cor. Ainda assim, Taty não se limita a essa
            escolha, mantendo aberta a possibilidade de explorar novas
            linguagens visuais no futuro.
          </p>
        </div>
      </div>
    </section>
  );
}
