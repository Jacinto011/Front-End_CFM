export async function handleGerarCodigo(req, res) {
    try {
      const apiUrl = process.env.API_URL;
      if (!apiUrl) {
        throw new Error('A variável API_URL não está configurada.');
      }
  
      //console.log('Enviando requisição para:', `${apiUrl}/users/GerarToken`);
      //console.log("Dados enviados:", JSON.stringify(req.body, null, 2));
  
      const response = await fetch(`${apiUrl}/users/GerarCodigo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || 'Erro ao gerar codigo');
      }
  
      const data = await response.json();
      //console.log('Resposta da API:', data.token);
      res.status(201).json(data);
    } catch (error) {
      console.error('Erro ao gerar codigo:', error.message);
      res.status(500).json({ message: 'Erro ao gerar codigo', error: error.message });
    }
  }
  