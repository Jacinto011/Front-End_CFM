const apiUrl = process.env.API_URL;

export async function handleChangePass(req, res) {
    //console.log('Dados do Corpo da Requisicao: ', req.body);
    
  try {
    const response = await fetch(`${apiUrl}/users/RedefinirSenha`, {
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
      res.status(response.status).json({ message: 'Nao foi possivel alterar senha', ...errorData });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao alterar senha', error });
  }
}
