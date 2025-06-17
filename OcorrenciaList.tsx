import React from 'react';
import { Ocorrencia } from '../models/Ocorrencia';

interface OcorrenciaListProps {
  ocorrencias: Ocorrencia[];
  onEditar: (id: number) => void;
  onExcluir: (id: number) => void;
}

const OcorrenciaList: React.FC<OcorrenciaListProps> = ({ 
  ocorrencias, 
  onEditar, 
  onExcluir 
}) => {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Lista de Ocorrências</h2>
      
      {ocorrencias.length === 0 ? (
        <p className="text-gray-500">Nenhuma ocorrência cadastrada.</p>
      ) : (
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Data</th>
              <th className="py-3 px-4 text-left">Aluno</th>
              <th className="py-3 px-4 text-left">Turma</th>
              <th className="py-3 px-4 text-left">Disciplina</th>
              <th className="py-3 px-4 text-left">Professor</th>
              <th className="py-3 px-4 text-left">Motivo</th>
              <th className="py-3 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {ocorrencias.map((ocorrencia) => (
              <tr key={ocorrencia.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">
                  {new Date(ocorrencia.data).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">{ocorrencia.aluno}</td>
                <td className="py-3 px-4">{ocorrencia.turma}</td>
                <td className="py-3 px-4">{ocorrencia.disciplina}</td>
                <td className="py-3 px-4">{ocorrencia.professor}</td>
                <td className="py-3 px-4">{ocorrencia.motivo}</td>
                <td className="py-3 px-4 space-x-2">
                  <button
                    onClick={() => onEditar(ocorrencia.id)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onExcluir(ocorrencia.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OcorrenciaList;