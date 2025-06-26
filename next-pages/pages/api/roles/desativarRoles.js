const apiUrl = process.env.API_URL;

export async function desativeRoles(req, res) {
  const { idUsuario, roles } = req.body;
 //console.log(req.body);
  

  if (!idUsuario || !roles) {
    return res.status(400).json({ message: 'ID e roles são obrigatórios.' });
  }

  try {
    const response = await fetch(`${apiUrl}/users/roles/desativar`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idUsuario, roles }),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error(`Erro ao desativar roles para ID ${id}:`, error);
    res.status(500).json({ message: 'Erro ao desativar roles', error: error.message });
  }
}
