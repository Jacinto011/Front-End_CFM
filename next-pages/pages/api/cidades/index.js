// pages/api/cidades/index.js
const apiUrl = process.env.API_URL;
//import cidadesData from '../../../data/cidadesData';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':      
      try {
        const response = await fetch(`${apiUrl}/users/0/cidade`);
        
        const data = await response.json();
        res.status(200).json(data);
      } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cidades', error });
      }
      break;

    // Adicione outros casos conforme necessário (POST, PUT, DELETE)

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}
