export interface Aviso {
  id: number;
  cliente: string;
  maquina?: string;
  descripcion: string;
  tipo: string;
  estado: "abierto" | "cerrado";
  fechaCreacion: string;
  fechaCierre?: string;
}
