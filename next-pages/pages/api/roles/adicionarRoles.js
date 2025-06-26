const apiUrl = process.env.API_URL;

export async function addRolesUser(req, res) {
  //console.log('Dados JSON: ',req.body);
  
  try {
    const response = await fetch(`${apiUrl}/users/add/roles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.status(201).json(data);
  } catch (error) {
    console.error('Erro ao adicionar roles:', error);
    res.status(500).json({ message: 'Erro ao adicionar roles', error: error.message });
  }
}
