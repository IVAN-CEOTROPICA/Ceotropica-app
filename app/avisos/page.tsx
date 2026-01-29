"use client";

import { useEffect, useState } from "react";

type Aviso = {
  id: number;
  cliente: string;
  maquina: string;
  descripcion: string;
  tipo: string;
  estado: string;
  fechaCreacion: string;
};

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  useEffect(() => {
    const datos = localStorage.getItem("avisos");
    if (datos) {
      const parsed = JSON.parse(datos);
      const abiertos = parsed.filter(
        (aviso: Aviso) => aviso.estado === "abierto"
      );
      setAvisos(abiertos);
    }
  }, []);

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Avisos abiertos</h1>

      {avisos.length === 0 && (
        <p>No hay avisos abiertos</p>
      )}

      <ul className="space-y-3">
        {avisos.map((aviso) => (
          <li
            key={aviso.id}
            className="border p-3 rounded"
          >
            <p><strong>Cliente:</strong> {aviso.cliente}</p>
            <p><strong>Máquina:</strong> {aviso.maquina || "-"}</p>
            <p><strong>Avería:</strong> {aviso.descripcion}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
