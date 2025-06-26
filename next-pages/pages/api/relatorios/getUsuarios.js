
//import usersData from '../../../data/usersData';
// Dados estáticos para retornar
const apiUrl = process.env.API_URL;
//console.log('Side Server: ', apiUrl);

export async function handleGetUsers(req, res) {
  try {
    const response = await fetch(`${apiUrl}/candidato/todos`);

    if (!response.ok) {
      // Trata erros específicos baseados no status da resposta
      if (response.status === 401) {
        return res.status(401).json({ message: 'Usuário não autorizado. Por favor, faça login novamente.' });
      }
      if (response.status === 403) {
        return res.status(403).json({ message: 'Acesso proibido. Você não tem permissão para acessar este recurso.' });
      }
      if (response.status === 500) {
        return res.status(500).json({ message: 'Erro interno do servidor. Tente novamente mais tarde.' });
      }

      // Lida com outros tipos de erro
      return res.status(response.status).json({ message: `Erro: ${response.statusText}` });
    }

    // Processa a resposta caso seja bem-sucedida
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    // Trata erros inesperados durante a execução da função
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
}
