const apiUrl = process.env.API_URL;

export async function handleAddUser(req, res) {
  //console.log('Dados de adicionar usuario chegaram: ', req.body);
  
  try {
    const response = await fetch(`${apiUrl}/users/add/User`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body), // Envia o corpo da requisição diretamente
    });

    if (response.ok) {
      const newUser = await response.json();
      res.status(201).json(newUser); // Retorna o novo inscrito adicionado
    } else {
      const errorData = await response.json();
      res.status(response.status).json({ message: 'Erro ao adicionar inscrito', ...errorData });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar inscrito', error });
  }
}
