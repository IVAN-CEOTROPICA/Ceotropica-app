"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<any[]>([]);
  const [filtroCliente, setFiltroCliente] = useState("");

  useEffect(() => {
    const datos = localStorage.getItem("avisos");
    if (!datos) return;

    const parsed = JSON.parse(datos);

    setAvisos(
      parsed
        .filter((a: any) => a.estado === "abierto")
        .sort(
          (a: any, b: any) =>
            new Date(b.fechaCreacion).getTime() -
            new Date(a.fechaCreacion).getTime()
        )
    );
  }, []);

  function cerrarAviso(id: number) {
    const datos = localStorage.getItem("avisos");
    if (!datos) return;

    const avisos = JSON.parse(datos);

    const actualizados = avisos.map((aviso: any) =>
      aviso.id === id
        ? {
            ...aviso,
            estado: "cerrado",
            fechaCierre: new Date().toISOString(),
          }
        : aviso
    );

    localStorage.setItem("avisos", JSON.stringify(actualizados));

    setAvisos(
      actualizados.filter((a: any) => a.estado === "abierto")
    );
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <Nav />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Filtrar por cliente"
        value={filtroCliente}
        onChange={(e) => setFiltroCliente(e.target.value)}
      />

      <h1 className="text-2xl font-bold mb-4">Avisos abiertos</h1>

      {avisos.length === 0 && (
        <p>No hay avisos abiertos</p>
      )}

      <ul className="space-y-4">
        {avisos
          .filter(a =>
            (a.cliente || "")
              .toLowerCase()
              .includes(filtroCliente.toLowerCase())
          )
          .map((aviso) => (
            <li
              key={aviso.id}
              className="border p-4 rounded"
            >
              <p className="text-lg font-semibold">
                {aviso.cliente}
              </p>

              <p className="text-sm text-gray-500">
                {aviso.maquina || "-"}
              </p>

              <p className="mt-2">
                {aviso.descripcion}
              </p>

              <button
                onClick={() => cerrarAviso(aviso.id)}
                className="mt-4 w-full bg-green-600 text-white py-3 rounded text-lg"
              >
                ✅ Cerrar aviso
              </button>
            </li>
          ))}
      </ul>
    </main>
  );
}
