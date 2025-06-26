//import usersData from '../../../data/usersData'; // Importa os dados estáticos
const apiUrl = process.env.API_URL;

export async function getRolesUse(req, res) {
  const { id } = req.query; // Obtém o ID da query string
  //console.log('Id: ', id);
  
  try {
    const response = await fetch(`${apiUrl}/users/roles/${id}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar roles de usuários', error });
  }

}
