import type { Pessoa } from "./Pessoa";

export interface Aluno extends Pessoa {
  turma: string;
}