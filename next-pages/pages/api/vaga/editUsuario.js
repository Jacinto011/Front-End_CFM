const apiUrl = process.env.API_URL;

export async function handleUpdateUser(req, res) {
  const { id } = req.query; // Obtém o ID da query string
  const { id_usuario,nome, apelido, username, anoDeNascimento,  email, idCidade, contato1, contato2, estadoUsuario, urlImage  } = req.body; // Dados enviados no corpo da requisição
    console.log('Id: ', req.query);
    console.log('Corpo da requisição: ', JSON.stringify(req.body, null, 2));
 
  if (!id_usuario) {
    return res.status(400).json({ error: 'ID são obrigatórios para atualizar o usuário' });
  }

  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_usuario, nome, apelido, username, anoDeNascimento, email, idCidade, contato1, contato2, estadoUsuario, urlImage })
        //console.log('Atualizando usuário com ID:', id);
        //console.log('Dados para atualização:', { id_usuario, nome, apelido, username,),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ message: 'Erro ao atualizar usuário', error: errorData });
    }

    const data = await response.json();
    res.status(200).json({ message: 'Usuário atualizado com sucesso', data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error });
  }
}
