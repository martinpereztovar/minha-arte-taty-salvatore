import React, { useState } from "react";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [images, setImages] = useState([
    { id: 1, title: "Desenho 1", url: "/src/assets/drawing1.jpeg" },
    { id: 2, title: "Desenho 2", url: "/src/assets/drawing2.jpeg" },
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);

  // Mock login (apenas checa string fixa)
  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "taty@admin.com" && password === "123456") {
      setIsLoggedIn(true);
    } else {
      alert("Credenciais inválidas");
    }
  };

  // Mock upload (adiciona ao array local)
  const handleUpload = (e) => {
    e.preventDefault();
    if (!newFile || !newTitle) {
      alert("Preencha título e imagem");
      return;
    }
    const newImage = {
      id: Date.now(),
      title: newTitle,
      url: URL.createObjectURL(newFile), // mock local
    };
    setImages([...images, newImage]);
    setNewTitle("");
    setNewFile(null);
  };

  // Mock delete
  const handleDelete = (id) => {
    setImages(images.filter((img) => img.id !== id));
  };

  // Tela de login
  if (!isLoggedIn) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-80"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login Admin</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded hover:opacity-90"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }

  // Painel Admin
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Painel da Artista</h1>

      {/* Formulário de upload */}
      <form
        onSubmit={handleUpload}
        className="bg-white p-6 rounded-lg shadow-md mb-10 max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">Adicionar novo desenho</h2>
        <input
          type="text"
          placeholder="Título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewFile(e.target.files[0])}
          className="w-full mb-4"
        />
        <button
          type="submit"
          className="bg-brand text-white px-6 py-2 rounded hover:opacity-90"
        >
          Upload
        </button>
      </form>

      {/* Lista de imagens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img) => (
          <div
            key={img.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <span>{img.title}</span>
              <button
                onClick={() => handleDelete(img.id)}
                className="text-red-500 hover:text-red-700"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
