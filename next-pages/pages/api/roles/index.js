// index.js
import { addRolesUser } from './adicionarRoles';
import { ativarRoles } from './ativarRoles';
import { desativeRoles } from './desativarRoles';
import { getRolesUse } from './getRolesUser';

export default async function handler(req, res) {
  const { action } = req.query; // Determina a ação através da query

  try {
    switch (req.method) {
      case 'GET': 
        if (req.query.id) {
          await getRolesUse(req, res); // Buscar roles por usuário
        } else {
          res.status(400).json({ message: 'ID do usuário não fornecido.' });
        }
        break;

      case 'POST':
        console.log('Server Side: Adicionar Roles');
        await addRolesUser(req, res); // Adicionar nova role
        break;

      case 'PUT':
        if (action === 'ativar') {
          console.log('Server Side: Ativar');    
          await ativarRoles(req, res); // Ativar roles
        } else if (action === 'desativar') {
          console.log('Server Side: Desativar');
          await desativeRoles(req, res); // Desativar roles
        } else {
          res.status(400).json({ message: 'Ação inválida para o método PUT.' });
        }
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        res.status(405).end(`Método ${req.method} não permitido.`);
    }
  } catch (error) {
    console.error('Erro no handler:', error);
    res.status(500).json({ message: 'Erro interno do servidor', error });
  }
}
