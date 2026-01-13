export default function Home() {
  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">CEOTROPICA · SAT</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Cliente"
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Máquina"
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Avería / trabajo realizado"
        rows={4}
      />

      <button className="bg-black text-white w-full p-2 rounded">
        Guardar aviso
      </button>
    </main>
  );
}