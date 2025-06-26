import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap";
import styles from '@/styles/ProjectTables.module.css';  // Importando arquivo CSS


interface TableData {
  id_usuario: number;
  nome: string;
  apelido: string;
  username: string | null;
  email: string;
  ano_de_nascimento: number;
  idCidade: number;
  contato1: string;
  contato2: string | null;
  urlImage: string | null;
  estadoUsuario: number | null;
  data_criacao: string;
  roles: string[]; // Array de strings para as funções (roles)
}


const ProjectTables: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [selectedUser, setSelectedUser] = useState<TableData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();



  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbnVlbGNvc3RhQGdtYWlsLmNvbSIsInN1YiI6Miwibm9tZSI6Ik1hbnVlbCIsImFwZWxpZG8iOiJTb3NhIiwicm9sZXMiOlsiRXN0dWRhbnRlIiwiRXN0dWRhbnRlIiwiRXN0dWRhbnRlIiwiQWRtaW4iLCJBZG1pbiIsIkVzdHVkYW50ZSJdLCJpYXQiOjE3MzczNjQzNDMsImV4cCI6MTczNzM2NjE0M30.EGHbkw6slJT7ITGldwtLkMS2ESucAoFzUEjoVDp4Akw';
      //const token = localStorage.getItem('token'); // Pegue o token do localStorage
      //console.log('Dados do Token',token);

      const response = await fetch('/api/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `, // Adicione o token no cabeçalho
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados.');
      }

      const result = await response.json();
      setData(result);
      // console.log(result);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      // setError('Erro ao buscar dados.');
    }
  };

  const handleUserClick = (user: TableData) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleClick = () => {
    if (selectedUser) {
      router.push(`/usuarios/${selectedUser.id_usuario}`); // Redireciona para a rota com o nome do usuário
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = data.filter(user => {
    const fullName = `${user?.nome?.toLowerCase()} ${user?.apelido?.toLowerCase()}`;
    const idStr = String(user.id_usuario); // converte ID para string
    return fullName.includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      idStr.includes(searchTerm);
  });
  

  return (
    <Card className={styles.customCard}>
      <CardBody>
        <CardTitle tag="h5" className={styles.title}>Lista de Usuários</CardTitle>
        <CardSubtitle className={`mb-2 text-muted ${styles.subtitle}`} tag="h6">
          Detalhes dos Usuários
        </CardSubtitle>

       <div className="d-flex justify-content-between mb-3">
          <Input
            type="text"
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`${styles.input} me-2`}
            style={{ maxWidth: '300px' }}
          />
        </div>


        <div className="table-responsive">
          <Table className={`text-nowrap mt-3 align-middle ${styles.table}`} borderless>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Apelido</th>
                <th>Email</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={index} className={`border-top ${styles.row}`} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                  <td>{user.id_usuario}</td>
                  <td>{user.nome}</td>
                  <td>{user.apelido}</td>
                  <td>{user.email}</td>
                  <td>
                    {(user.estadoUsuario === 1) ? (
                      <span className={`p-2 bg-success rounded-circle d-inline-block ms-3 ${styles.statusSuccess}`} />
                    ) : (
                      <span className={`p-2 bg-danger rounded-circle d-inline-block ms-3 ${styles.statusDanger}`} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>

      {/* Modal para exibir os detalhes do usuário */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Detalhes do Usuário</ModalHeader>
        {selectedUser && (
          <ModalBody>
            <p><strong>Nome:</strong> {selectedUser.nome}</p>
            <p><strong>Apelido:</strong> {selectedUser.apelido}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Telefone:</strong> {selectedUser.contato1}</p>
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="primary" onClick={handleClick}>
            Ver Detalhes
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default ProjectTables;
