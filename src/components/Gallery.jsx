import React from "react";
import img1 from "../assets/drawing1.jpeg";
import img2 from "../assets/drawing2.jpeg";
import img3 from "../assets/drawing3.jpeg";
import img4 from "../assets/drawing4.jpeg";
import img5 from "../assets/drawing5.jpeg";

const images = [img1, img2, img3, img4, img5];

export default function Gallery() {
  return (
    <section id="portfolio" className="bg-gray-50 px-6 md:px-16 py-12 md:py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
        Portfólio
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
          >
            <img
              src={src}
              alt={`Desenho ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
