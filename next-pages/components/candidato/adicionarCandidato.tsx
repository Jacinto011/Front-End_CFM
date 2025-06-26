'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdicionarCandidato() {
  const [form, setForm] = useState({
    id: '',
    idV: '',
    area: '',
    estado: ''
  })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/candidato/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: parseInt(form.id),
          idV: parseInt(form.idV),
          area: form.area,
          estado: form.estado
        })
      })

      if (!res.ok) {
        throw new Error('Erro ao criar candidato')
      }

      alert('Candidato criado com sucesso!')
      router.push('/candidato')
    } catch (error) {
      console.error('Erro ao criar candidato:', error)
      alert('Erro ao cadastrar candidato')
    }
  }

  return (
  <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-700">Adicionar Candidato</h1>
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="id" className="block mb-2 text-sm font-semibold text-gray-700">ID do Usuário</label>
        <input
          type="number"
          name="id"
          value={form.id}
          onChange={handleChange}
          required
          placeholder="Digite o ID do usuário"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="idV" className="block mb-2 text-sm font-semibold text-gray-700">ID da Vaga</label>
        <input
          type="number"
          name="idV"
          value={form.idV}
          onChange={handleChange}
          required
          placeholder="Digite o ID da vaga"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="area" className="block mb-2 text-sm font-semibold text-gray-700">Área</label>
        <input
          type="text"
          name="area"
          value={form.area}
          onChange={handleChange}
          required
          placeholder="Informe a área do candidato"
          className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="estado" className="block mb-2 text-sm font-semibold text-gray-700">Estado</label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Selecione o estado</option>
          <option value="pendente">Pendente</option>
          <option value="aprovado">Aprovado</option>
          <option value="rejeitado">Rejeitado</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-colors duration-300"
      >
        Cadastrar
      </button>
    </form>
  </div>
)
}