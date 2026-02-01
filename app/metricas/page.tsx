"use client";

import { useEffect, useState } from "react";
import { Aviso } from "../types/Aviso";
import Nav from "../components/Nav";

type Aviso = {
  estado: string;
  fechaCreacion?: string;
  fechaCierre?: string;
};

export default function MetricasPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  useEffect(() => {
    const datos = localStorage.getItem("avisos");
    if (!datos) return;
    setAvisos(JSON.parse(datos));
  }, []);

  const cerrados = avisos.filter(a => a.estado === "cerrado");
  const porCliente: Record<string, number> = {};

cerrados.forEach(a => {
  const cliente = a.cliente || "Sin cliente";
  porCliente[cliente] = (porCliente[cliente] || 0) + 1;
});

const clientesOrdenados = Object.entries(porCliente).sort(
  (a, b) => b[1] - a[1]
);


  const hoy = new Date();
  const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());

  const cerradosHoy = cerrados.filter(a =>
    a.fechaCierre && new Date(a.fechaCierre) >= inicioHoy
  );

  const inicioSemana = new Date(inicioHoy);
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());

  const cerradosSemana = cerrados.filter(a =>
    a.fechaCierre && new Date(a.fechaCierre) >= inicioSemana
  );

  const tiempos = cerrados
    .filter(a => a.fechaCreacion && a.fechaCierre)
    .map(a =>
      new Date(a.fechaCierre!).getTime() -
      new Date(a.fechaCreacion!).getTime()
    );

  const tiempoMedio =
    tiempos.length > 0
      ? Math.round(
          tiempos.reduce((a, b) => a + b, 0) / tiempos.length / 60000
        )
      : 0;

  return (
    <main className="p-4 max-w-md mx-auto">
      <Nav />

      <h1 className="text-2xl font-bold mb-4">Métricas</h1>

      <ul className="space-y-2">
        <li><strong>Total avisos cerrados:</strong> {cerrados.length}</li>
        <li><strong>Cerrados hoy:</strong> {cerradosHoy.length}</li>
        <li><strong>Cerrados esta semana:</strong> {cerradosSemana.length}</li>
        <li><strong>Tiempo medio de resolución:</strong> {tiempoMedio} min</li>
      </ul>
      <h2 className="text-xl font-bold mt-6 mb-2">
  Avisos cerrados por cliente
</h2>

{clientesOrdenados.length === 0 && (
  <p>No hay avisos cerrados</p>
)}

<ul className="space-y-1">
  {clientesOrdenados.map(([cliente, total]) => (
    <li key={cliente}>
      <strong>{cliente}</strong>: {total}
    </li>
  ))}
</ul>

    </main>
  );
}
