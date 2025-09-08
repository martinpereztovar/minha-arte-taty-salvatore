import React, { useState, useEffect } from "react";
import { auth, storage, db } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function Admin() {
  const [user, setUser] = useState(null); // estado do usuário logado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [images, setImages] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newFile, setNewFile] = useState(null);

  // Verifica se há usuário logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Buscar imagens do Firestore
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imgs = querySnapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setImages(imgs);
      } catch (error) {
        console.error("Erro ao buscar imagens:", error);
      }
    };

    fetchImages();
  }, []);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Erro no login: " + error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Upload
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!newFile || !newTitle) {
      alert("Preencha título e selecione uma imagem");
      return;
    }

    try {
      const storageRef = ref(storage, `drawings/${Date.now()}-${newFile.name}`);
      await uploadBytes(storageRef, newFile);
      const downloadURL = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db, "images"), {
        title: newTitle,
        url: downloadURL,
      });

      setImages([
        ...images,
        { id: docRef.id, title: newTitle, url: downloadURL },
      ]);

      setNewTitle("");
      setNewFile(null);
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
      alert("Erro ao subir imagem");
    }
  };

  // Delete
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "images", id));
      setImages(images.filter((img) => img.id !== id));
    } catch (error) {
      console.error("Erro ao excluir:", error);
      alert("Erro ao excluir imagem");
    }
  };

  // Tela de login
  if (!user) {
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

  // Painel admin
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Painel da Artista</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:opacity-90"
        >
          Sair
        </button>
      </div>

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

        {/* Área de upload */}
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-50 transition overflow-hidden"
        >
          {newFile ? (
            <div className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(newFile)}
                alt="preview"
                className="h-24 object-contain mb-2"
              />
              <p className="text-sm text-gray-700 truncate w-40 text-center">
                {newFile.name}
              </p>
            </div>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-500 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Clique ou arraste uma imagem aqui
              </p>
            </>
          )}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={(e) => setNewFile(e.target.files[0])}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          className="mt-4 bg-brand text-white px-6 py-2 rounded hover:opacity-90"
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
