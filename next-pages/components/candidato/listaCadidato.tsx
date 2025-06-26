'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ListaCandidatos() {
  const [candidatos, setCandidatos] = useState([])
  const router = useRouter()

  const carregarCandidatos = async () => {
    const res = await fetch('http://localhost:3000/candidato/todos')
    const data = await res.json()
    setCandidatos(data)
  }

  useEffect(() => {
    carregarCandidatos()
  }, [])

  const aprovarCandidato = async (idUsuario: number, idVaga: number) => {
    const Periodo = prompt('Informe o período do estágio:')
    const Remunerado = prompt('É remunerado? (sim/não):')
    const idSupervisor = prompt('Informe o ID do supervisor:')
    const estado = 'aprovado'

    if (Periodo && Remunerado && idSupervisor) {
      await fetch(`http://localhost:3000/candidato/aprovar/${idUsuario}/${idVaga}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Periodo,
          Remunerado,
          idSupervisor: parseInt(idSupervisor),
          estado
        })
      })
      alert('Candidato aprovado!')
      carregarCandidatos()
    }
  }

  const reprovarCandidato = async (idUsuario: number, idVaga: number) => {
    await fetch(`http://localhost:3000/candidato/reprovar/${idUsuario}/${idVaga}`, {
      method: 'GET'
    })
    alert('Candidato reprovado!')
    carregarCandidatos()
  }

  const eliminarCandidato = async (id: number) => {
    const confirmar = confirm('Tem certeza que deseja eliminar este candidato?')
    if (confirmar) {
      await fetch(`http://localhost:3000/candidato/eliminar/${id}`, {
        method: 'GET'
      })
      alert('Candidato eliminado!')
      carregarCandidatos()
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Lista de Candidatos</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">#</th>
            <th className="border p-2">ID Usuário</th>
            <th className="border p-2">Área</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((candidato: any, index: number) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{candidato.idUsuario}</td>
              <td className="border p-2">{candidato.area}</td>
              <td className="border p-2">{candidato.estado}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => router.push(`/candidato/editar/${candidato.idUsuario}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => aprovarCandidato(candidato.idUsuario, candidato.idVaga)}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => reprovarCandidato(candidato.idUsuario, candidato.idVaga)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Reprovar
                </button>
                <button
                  onClick={() => eliminarCandidato(candidato.idUsuario)}
                  className="bg-gray-700 hover:bg-black text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
