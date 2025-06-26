//import usersData from '../../../data/usersData'; // Importa os dados estáticos
const apiUrl = process.env.API_URL;

export async function handleGetUserByCod(req, res) {
  const { cod } = req.query; // Obtém o ID da query string
  //console.log('Id: ', id);
  
  try {
    const response = await fetch(`${apiUrl}/estagiario/usuario/${cod}`);
    const data = await response.json();
    console.log(data);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar relatorios', error });
  }

}
