import { handleGetUsers } from './getUsuarios';
import { handleGetUserById } from './getUsuarioId';
import { handleAddUser } from './addUsuario';
import { handleChangePass } from './changePass';
import { handleUpdateUser } from './editUsuario';
import { handleDeleteUser } from './deteleUsuario';
import { handleAlterPass } from './alterPass';
import { handleGetUserByCod } from './getUsuarioAvaliacao copy';
import { handleGetSupervisorE } from './getSupervisorE';

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        await handleGetUserById(req, res);
      }
      if (req.query.cod) {
        await handleGetUserByCod(req, res);
      } 
      if (req.query.supervisor) {
        await handleGetSupervisorE(req, res);
      } else {
        await handleGetUsers(req, res);
      }
      break;

    case 'POST':
      if (req.query.token) {
        console.log('METODO CHANCE PASSWORD: ', req.query.token);
        
        await handleChangePass(req, res);
      }
      else if (req.query.id) {
        console.log('Server Side Post');       
        await handleAlterPass(req, res);
      } else {
        await handleAddUser(req, res);
      }
      break;

    case 'PUT':
      if (req.query.id) {
        await handleUpdateUser(req, res); // Chama o método para atualizar usuário
      } else {
        res.status(400).json({ error: 'ID do usuário é necessário para atualizar' });
      }
      break;

    case 'DELETE':
      if (req.query.id) {
        console.log('Server Side DELETE');      
        await handleDeleteUser(req, res); // Chama o método para deletar usuário
      } else {
        res.status(400).json({ error: 'ID do usuário é necessário para deletar' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${req.method} não permitido`);
  }
}
