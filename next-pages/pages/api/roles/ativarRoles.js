const apiUrl = process.env.API_URL;

export async function ativarRoles(req, res) {
  const { idUsuario, roles } = req.body;

  if (!idUsuario || !roles) {
    return res.status(400).json({ message: 'ID e roles são obrigatórios.' });
  }

  try {
    const response = await fetch(`${apiUrl}/users/roles/ativar`, {
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
    console.error(`Erro ao ativar roles para ID ${idUsuario}:`, error);
    res.status(500).json({ message: 'Erro ao ativar roles', error: error.message });
  }
}
