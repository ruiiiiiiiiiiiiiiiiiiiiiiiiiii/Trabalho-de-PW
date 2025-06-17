import React, { useState, useEffect } from 'react';
import { Ocorrencia } from '../models/Ocorrencia';

interface OcorrenciaFormProps {
  onAddOcorrencia: (ocorrencia: Ocorrencia) => void;
  ocorrenciaEditando: Ocorrencia | null;
}

const OcorrenciaForm: React.FC<OcorrenciaFormProps> = ({ 
  onAddOcorrencia, 
  ocorrenciaEditando 
}) => {
  const [formData, setFormData] = useState<Omit<Ocorrencia, 'id'>>({
    data: new Date().toISOString().split('T')[0],
    aluno: '',
    turma: '',
    disciplina: '',
    professor: '',
    motivo: '',
    descricao: ''
  });

  useEffect(() => {
    if (ocorrenciaEditando) {
      const { id, ...rest } = ocorrenciaEditando;
      setFormData(rest);
    }
  }, [ocorrenciaEditando]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddOcorrencia({
      ...formData,
      id: ocorrenciaEditando ? ocorrenciaEditando.id : Date.now()
    });
    
    if (!ocorrenciaEditando) {
      setFormData({
        data: new Date().toISOString().split('T')[0],
        aluno: '',
        turma: '',
        disciplina: '',
        professor: '',
        motivo: '',
        descricao: ''
      });
    }
  };

  const motivos = ['Comportamento inadequado', 'Falta de material', 'Atraso', 'Falta', 'Outro'];
  const turmas = ['1º Ano Info', '1º Ano Agro', '2º Ano Info', '2º Ano Agro', '3º Ano Info', '3º Ano Agro'];
  const disciplinas = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Inglês', 'Educação Física'];

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-xl"
    >
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8 animate-fade-in">
        {ocorrenciaEditando ? '✏️ Editar Ocorrência' : '📝 Nova Ocorrência'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Data */}
        <div className="space-y-2 animate-slide-up delay-100">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data da Ocorrência <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              id="data"
              name="data"
              value={formData.data}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              required
            />
            <span className="absolute right-3 top-3 text-gray-400">
              📅
            </span>
          </div>
        </div>

        {/* Turma */}
        <div className="space-y-2 animate-slide-up delay-150">
          <label htmlFor="turma" className="block text-sm font-medium text-gray-700">
            Turma <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="turma"
              name="turma"
              value={formData.turma}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-all"
              required
            >
              <option value="">Selecione uma turma</option>
              {turmas.map(turma => (
                <option key={turma} value={turma}>{turma}</option>
              ))}
            </select>
            <span className="absolute right-3 top-3 text-gray-400">
              ▼
            </span>
          </div>
        </div>

        {/* Aluno */}
        <div className="space-y-2 animate-slide-up delay-200">
          <label htmlFor="aluno" className="block text-sm font-medium text-gray-700">
            Nome do Aluno <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="aluno"
              name="aluno"
              value={formData.aluno}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Digite o nome do aluno"
              required
            />
            <span className="absolute right-3 top-3 text-gray-400">
              👤
            </span>
          </div>
        </div>

        {/* Disciplina */}
        <div className="space-y-2 animate-slide-up delay-250">
          <label htmlFor="disciplina" className="block text-sm font-medium text-gray-700">
            Disciplina <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="disciplina"
              name="disciplina"
              value={formData.disciplina}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-all"
              required
            >
              <option value="">Selecione uma disciplina</option>
              {disciplinas.map(disciplina => (
                <option key={disciplina} value={disciplina}>{disciplina}</option>
              ))}
            </select>
            <span className="absolute right-3 top-3 text-gray-400">
              📚
            </span>
          </div>
        </div>

        {/* Professor */}
        <div className="space-y-2 animate-slide-up delay-300">
          <label htmlFor="professor" className="block text-sm font-medium text-gray-700">
            Professor <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="professor"
              name="professor"
              value={formData.professor}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Digite o nome do professor"
              required
            />
            <span className="absolute right-3 top-3 text-gray-400">
              👨‍🏫
            </span>
          </div>
        </div>

        {/* Motivo */}
        <div className="space-y-2 animate-slide-up delay-350">
          <label htmlFor="motivo" className="block text-sm font-medium text-gray-700">
            Motivo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="motivo"
              name="motivo"
              value={formData.motivo}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none transition-all"
              required
            >
              <option value="">Selecione um motivo</option>
              {motivos.map(motivo => (
                <option key={motivo} value={motivo}>{motivo}</option>
              ))}
            </select>
            <span className="absolute right-3 top-3 text-gray-400">
              ❗
            </span>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="space-y-2 mb-8 animate-slide-up delay-400">
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
          Descrição Detalhada <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <textarea
            id="descricao"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Descreva com detalhes o ocorrido..."
            required
          />
          <span className="absolute right-3 top-3 text-gray-400">
            ✍️
          </span>
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-4 pt-4 animate-fade-in delay-500">
        {ocorrenciaEditando && (
          <button
            type="button"
            onClick={() => {
              setFormData({
                data: new Date().toISOString().split('T')[0],
                aluno: '',
                turma: '',
                disciplina: '',
                professor: '',
                motivo: '',
                descricao: ''
              });
            }}
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
          >
            Limpar Formulário
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
        >
          {ocorrenciaEditando ? 'Atualizar Ocorrência' : 'Cadastrar Ocorrência'}
        </button>
      </div>
    </form>
  );
};

export default OcorrenciaForm;