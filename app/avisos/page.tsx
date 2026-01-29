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

  // ✅ FUNCIÓN FUERA
  function cerrarAviso(id: number) {
    const datos = localStorage.getItem("avisos");
    if (!datos) return;

    const parsed = JSON.parse(datos);

    const actualizados = parsed.map((aviso: any) =>
      aviso.id === id
        ? { ...aviso, estado: "cerrado" }
        : aviso
    );

    localStorage.setItem("avisos", JSON.stringify(actualizados));

    const abiertos = actualizados.filter(
      (aviso: any) => aviso.estado === "abierto"
    );

    setAvisos(abiertos);
  }

  // ✅ useEffect SOLO carga inicial
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
            <button
  onClick={() => cerrarAviso(aviso.id)}
  className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
>
  Marcar como terminado
</button>

          </li>
        ))}
      </ul>
    </main>
  );
}
