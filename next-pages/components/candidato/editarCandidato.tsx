'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditarCandidato() {
  const router = useRouter()
  const params = useParams()
  const idParam = params?.id

  const [area, setArea] = useState('')
  const [estado, setEstado] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!idParam) return

    async function fetchCandidato() {
      const res = await fetch(`http://localhost:3000/candidato/${idParam}`)
      if (res.ok) {
        const data = await res.json()
        setArea(data.area || '')
        setEstado(data.estado || '')
      } else {
        alert('Candidato não encontrado')
        router.push('/candidato')
      }
      setLoading(false)
    }
    fetchCandidato()
  }, [idParam, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!idParam) return

    const payload = {
      idUsuario: Number(idParam),
      area,
      estado,
    }

    const res = await fetch(`http://localhost:3000/candidato/atualizar/${idParam}`, {
      method: 'PUT', // Ajusta para PUT
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      alert('Candidato atualizado com sucesso!')
      router.push('/candidato')
    } else {
      alert('Erro ao atualizar candidato.')
    }
  }

  if (loading) return <p>Carregando dados do candidato...</p>

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Candidato #{idParam}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1" htmlFor="area">Área</label>
          <input
            type="text"
            id="area"
            value={area}
            onChange={e => setArea(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="estado">Estado</label>
          <input
            type="text"
            id="estado"
            value={estado}
            onChange={e => setEstado(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded"
        >
          Atualizar
        </button>
      </form>
    </div>
  )
}
