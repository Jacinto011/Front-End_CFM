import { handleGerarToken } from './GerarToken';
import { handleValidarToken } from './ValidarToken';
//import { handleAddInscrito } from './addInscrito';
//import preInscricaoData from '../../../data/Inscricao'; // Importar dados

export default async function handler(req, res) {
    try {
      switch (req.method) {
        case 'GET':
          //console.log('Server Side GET');
          await handleValidarToken(req, res);
          break;
  
        case 'POST':
          //console.log('Server Side POST');
          //console.log('Dados recebidos:', req.body); // Adicione logs para depuração
          await handleGerarToken(req, res);
          break;
  
        default:
          res.setHeader('Allow', ['GET', 'POST']);
          res.status(405).end(`Método ${req.method} não permitido`);
      }
    } catch (error) {
      console.error('Erro no handler:', error.message);
      res.status(500).json({ message: 'Erro interno no servidor', error });
    }
  }
  
