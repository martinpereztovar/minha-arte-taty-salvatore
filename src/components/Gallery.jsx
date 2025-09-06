import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Buscar imagens do Firestore
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imgs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setImages(imgs);
      } catch (error) {
        console.error("Erro ao carregar imagens:", error);
      }
    };

    fetchImages();
  }, []);

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  return (
    <section id="portfolio" className="bg-gray-50 px-6 md:px-16 py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
        Portfólio
      </h2>

      {images.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum desenho enviado ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((img, idx) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-3xl mx-auto flex items-center"
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar na imagem
          >
            {/* Botão anterior */}
            <button
              className="absolute left-0 text-white text-4xl px-4 hover:text-gray-300"
              onClick={handlePrev}
            >
              &#10094;
            </button>

            {/* Imagem */}
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].title}
              className="rounded-xl shadow-lg max-h-[80vh] object-contain mx-12"
            />

            {/* Botão próximo */}
            <button
              className="absolute right-0 text-white text-4xl px-4 hover:text-gray-300"
              onClick={handleNext}
            >
              &#10095;
            </button>

            {/* Fechar */}
            <button
              className="absolute -top-6 -right-6 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
