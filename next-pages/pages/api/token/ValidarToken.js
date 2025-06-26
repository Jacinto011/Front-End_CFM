
const apiUrl = process.env.API_URL;

export async function handleValidarToken(req, res) {
  const { token } = req.query;
  //console.log('Token fornecido: ', token);
  
  try {
    const response = await fetch(`${apiUrl}/users/ValidarToken/${token}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar token: ${response.statusText}`);
    }
    const data = await response.json();
    //console.log('Resposta da API',data);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar usuário com ID ${token}`, error: error.message });
  }
}
