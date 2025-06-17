import React, { useState } from 'react'
import OcorrenciaForm from './components/OcorrenciaForm'
import OcorrenciaList from './components/OcorrenciaList'
import { Ocorrencia } from './models/Ocorrencia'

export default function App() {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([])
  const [ocorrenciaEditando, setOcorrenciaEditando] = useState<Ocorrencia | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const handleAddOcorrencia = (ocorrencia: Ocorrencia) => {
    if (ocorrenciaEditando) {
      setOcorrencias(ocorrencias.map(o => o.id === ocorrencia.id ? ocorrencia : o))
    } else {
      setOcorrencias([...ocorrencias, { ...ocorrencia, id: Date.now() }])
    }
    setOcorrenciaEditando(null)
    setMostrarFormulario(false)
  }

  return (
    <div className="app-container">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Sistema de Ocorrências</h1>
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          {mostrarFormulario ? 'Ver Lista' : 'Nova Ocorrência'}
        </button>
      </header>

      {mostrarFormulario ? (
        <OcorrenciaForm 
          onAddOcorrencia={handleAddOcorrencia} 
          ocorrenciaEditando={ocorrenciaEditando} 
        />
      ) : (
        <OcorrenciaList 
          ocorrencias={ocorrencias} 
          onEditar={(id) => {
            const ocorrencia = ocorrencias.find(o => o.id === id)
            if (ocorrencia) {
              setOcorrenciaEditando(ocorrencia)
              setMostrarFormulario(true)
            }
          }}
          onExcluir={(id) => setOcorrencias(ocorrencias.filter(o => o.id !== id))} 
        />
      )}
    </div>
  )
}