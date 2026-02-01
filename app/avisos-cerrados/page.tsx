"use client";

import { useEffect, useState } from "react";
import Nav from "../components/Nav";

export default function AvisosCerradosPage() {
  const [avisosCerrados, setAvisosCerrados] = useState<any[]>([]);
  const [filtroCliente, setFiltroCliente] = useState("");

  useEffect(() => {
    const datos = localStorage.getItem("avisos");
    if (!datos) return;

    const parsed = JSON.parse(datos);

    const cerrados = parsed
      .filter((a: any) => a.estado === "cerrado")
      .sort(
        (a: any, b: any) =>
          new Date(b.fechaCierre).getTime() -
          new Date(a.fechaCierre).getTime()
      );

    setAvisosCerrados(cerrados);
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <Nav />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Filtrar por cliente"
        value={filtroCliente}
        onChange={(e) => setFiltroCliente(e.target.value)}
      />

      <h1 className="text-2xl font-bold mb-4">Avisos cerrados</h1>

      {avisosCerrados.length === 0 && (
        <p>No hay avisos cerrados</p>
      )}

      <ul className="space-y-3">
        {avisosCerrados
          .filter(a =>
            (a.cliente || "")
              .toLowerCase()
              .includes(filtroCliente.toLowerCase())
          )
          .map((aviso) => (
            <li
              key={aviso.id}
              className="border p-3 rounded bg-gray-100 text-black"
            >
              <p>
                <strong>Cliente:</strong> {aviso.cliente}
              </p>
              <p>
                <strong>Máquina:</strong> {aviso.maquina || "-"}
              </p>
              <p>
                <strong>Avería:</strong> {aviso.descripcion}
              </p>
              <p className="text-sm text-gray-600">
                Cerrado el:{" "}
                {aviso.fechaCierre
                  ? new Date(aviso.fechaCierre).toLocaleString()
                  : "-"}
              </p>
            </li>
          ))}
      </ul>
    </main>
  );
}
