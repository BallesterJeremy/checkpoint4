import { Route, Routes } from "react-router-dom";
import Languages from "@pages/Languages";
import Whatever from "@pages/Whatever";
import AdminLogin from "@pages/TextLanguages/AdminLog/AdminLogin";
import AdminHome from "@pages/AdminPages/AdminHome";
import { useState } from "react";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import React from "./pages/React";
import Python from "./pages/Python";
import TypeScript from "./pages/TypeScript";
import JavaScript from "./pages/JavaScript";
import SQL from "./pages/SQL";
import Elixir from "./pages/Elixir";
import "./App.css";

function App() {
  const [adm, setAdm] = useState({ email: "", id: null });
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/react" element={<React />} />
        <Route path="/python" element={<Python />} />
        <Route path="/typescript" element={<TypeScript />} />
        <Route path="/javascript" element={<JavaScript />} />
        <Route path="/sql" element={<SQL />} />
        <Route path="/elixir" element={<Elixir />} />
        <Route path="/whatever" element={<Whatever />} />
        <Route exact path="/admin" element={<AdminLogin setAdm={setAdm} />} />
        {adm.email && <Route path="/admin/home" element={<AdminHome />} />}
      </Routes>
    </div>
  );
}

export default App;
