const apiUrl = process.env.API_URL;

export async function handleDeleteUser(req, res) {
  const { id } = req.query; // Obtém o ID da query string
  //console.log('Id: ', id);
  

  if (!id) {
    return res.status(400).json({ error: 'ID do usuário é obrigatório para deletar' });
  }

  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ message: 'Erro ao remover usuário', error: errorData });
    }

    const data = await response.json();
    res.status(200).json({ message: 'Usuário removido com sucesso', data });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover usuário', error });
  }
}
