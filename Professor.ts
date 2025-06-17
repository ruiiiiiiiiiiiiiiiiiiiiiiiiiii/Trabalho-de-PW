import type { Pessoa } from "./Pessoa";

export interface Professor extends Pessoa {
  materias: string[];
}