"use client";
console.log("PAGE CARGADA");
import {useState} from "react";
export default function Home() {
const [cliente, setCliente] = useState("");
const [maquina, setMaquina] = useState("");
const [descripcion, setDescripcion] = useState("");
function guardarAviso() {
  if (!cliente || !descripcion) {
    alert("Cliente y avería son obligatorios");
    return;
  }

  const nuevoAviso = {
    id: Date.now(),
    cliente,
    maquina,
    descripcion,
    tipo: "reparacion",
    estado: "abierto",
    fechaCreacion: new Date().toISOString(),
  };

  const avisosExistentes = JSON.parse(
    localStorage.getItem("avisos") || "[]"
  );

  avisosExistentes.push(nuevoAviso);

  localStorage.setItem("avisos", JSON.stringify(avisosExistentes));

  // limpiar formulario
  setCliente("");
  setMaquina("");
  setDescripcion("");

  alert("Aviso guardado");
}

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">CEOTROPICA · SAT</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Cliente"
         value={cliente}
         onChange={(e) => setCliente(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Máquina"
        value={maquina}
        onChange={(e) => setMaquina(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Avería / trabajo realizado"
        rows={4}
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button 
       onClick={guardarAviso}
       className="bg-black text-white w-full p-2 rounded">
        Guardar aviso
      </button>
    </main>
  );
}