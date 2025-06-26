
const apiUrl = process.env.API_URL;

export async function handleValidarCodigo(req, res) {
  const { codigo, email } = req.query;
  //console.log('Dados fornecido: ', codigo, email);
  
  try {
    const response = await fetch(`${apiUrl}/users/ValidarCodigo/${codigo}/${email}`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar token: ${response.statusText}`);
    }
    const data = await response.json();
    //console.log('Resposta da API',data);
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: `Erro ao buscar dados de verificaco ${email}`, error: error.message });
  }
}
