import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Contact from "./components/Contato";

// import do Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Gallery />
        <Contact />
      </main>
      <Footer />

      {/* Analytics do Vercel */}
      <Analytics />
    </div>
  );
}
