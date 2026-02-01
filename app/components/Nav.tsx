"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "font-bold underline"
      : "text-blue-600";

  return (
    <nav className="mb-6 flex gap-4">
      <Link href="/" className={linkClass("/")}>
        Crear aviso
      </Link>

      <Link href="/avisos" className={linkClass("/avisos")}>
        Avisos abiertos
      </Link>

      <Link
        href="/avisos-cerrados"
        className={linkClass("/avisos-cerrados")}
      >
        Avisos cerrados
      </Link>

      <Link
        href="/metricas"
        className={linkClass("/metricas")}
      >
        Métricas
      </Link>
    </nav>
  );
}
