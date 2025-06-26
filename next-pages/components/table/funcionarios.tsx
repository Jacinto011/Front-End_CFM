import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, FormGroup, Label } from "reactstrap";
import styles from '@/styles/ProjectTables.module.css';

interface TableData {
  tb_id_usuario: number,
  nome_usuario: string,
  email: string,
  nome_cargo: string,
  ativo: number,
  id_cargo: number,
}

interface Cargo {
  id_cargo: number;
  nome_cargo: string;
  ativo: boolean;
}

const FuncionarioTable: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [selectedUser, setSelectedUser] = useState<TableData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
    fetchCargos();
  }, []);

  const fetchCargos = async () => {
    try {
      const response = await fetch("/api/cargos");
      const result = await response.json();
      setCargos(result.map((cargo: any) => ({
        ...cargo,
        ativo: cargo.ativo === 1
      })));
    } catch (error) {
      console.error("Erro ao buscar cargos:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/funcionarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer `,
        },
      });

      if (!response.ok) throw new Error('Erro ao buscar dados.');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const handleUserClick = (user: TableData) => {
    setSelectedUser(user);
    setSelectedCargo(user.id_cargo);
    setIsActive(user.ativo === 1);
    setModalOpen(true);
  };

  const handleStatusChange = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/funcionarios/${selectedUser.tb_id_usuario}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ativo: isActive ? 0 : 1
        }),
      });

      if (response.ok) {
        fetchData(); // Atualiza a lista
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const handleCargoChange = async () => {
    if (!selectedUser || !selectedCargo) return;

    try {
      const response = await fetch(`/api/funcionarios/${selectedUser.tb_id_usuario}/cargo`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_cargo: selectedCargo
        }),
      });

      if (response.ok) {
        fetchData(); // Atualiza a lista
        setModalOpen(false);
      }
    } catch (error) {
      console.error('Erro ao atualizar cargo:', error);
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredData = data.filter(user => {
    const fullName = `${user?.nome_usuario?.toLowerCase()}`;
    const idStr = String(user.tb_id_usuario);
    return fullName.includes(searchTerm) ||
      user.email?.toLowerCase().includes(searchTerm) ||
      idStr.includes(searchTerm);
  });

  return (
    <Card className={styles.customCard}>
      <CardBody>
        <CardTitle tag="h5" className={styles.title}>Lista de Funcionarios</CardTitle>

        <div className="d-flex justify-content-between mb-3">
          <Input
            type="text"
            placeholder="Pesquisar usuários..."
            value={searchTerm}
            onChange={handleSearchChange}
            className={`${styles.input} me-2`}
            style={{ maxWidth: '300px' }}
          />
          <Button color="success" onClick={() => router.push('/funcionarios/cadastrar-funcionario')}>
            + Adicionar Novo Funcionario
          </Button>
        </div>

        <div className="table-responsive">
          <Table className={`text-nowrap mt-3 align-middle ${styles.table}`} borderless>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Cargo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr key={index} className={`border-top ${styles.row}`} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                  <td>{user.tb_id_usuario}</td>
                  <td>{user.nome_usuario}</td>
                  <td>{user.email}</td>
                  <td>{user.nome_cargo}</td>
                  <td>
                    {(user.ativo === 1) ? (
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

      {/* Modal para gerenciamento do usuário */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Gerenciar Funcionário</ModalHeader>
        {selectedUser && (
          <ModalBody>
            <FormGroup>
              <Label><strong>ID:</strong> {selectedUser.tb_id_usuario}</Label>
            </FormGroup>
            <FormGroup>
              <Label><strong>Nome:</strong> {selectedUser.nome_usuario}</Label>
            </FormGroup>
            <FormGroup>
              <Label><strong>Email:</strong> {selectedUser.email}</Label>
            </FormGroup>
            
            <FormGroup>
              <Label for="cargoSelect">Cargo</Label>
              <Input
                type="select"
                id="cargoSelect"
                value={selectedCargo || ''}
                onChange={(e) => setSelectedCargo(Number(e.target.value))}
              >
                {cargos.map((cargo) => (
                  <option key={cargo.id_cargo} value={cargo.id_cargo}>
                    {cargo.nome_cargo}
                  </option>
                ))}
              </Input>
            </FormGroup>
            
            <FormGroup switch>
              <Input
                type="switch"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <Label check>{isActive ? 'Ativo' : 'Inativo'}</Label>
            </FormGroup>
          </ModalBody>
        )}
        <ModalFooter>
          <Button color="primary" onClick={handleCargoChange}>
            Salvar Cargo
          </Button>
          <Button 
            color={isActive ? 'danger' : 'success'} 
            onClick={handleStatusChange}
          >
            {isActive ? 'Desativar' : 'Ativar'}
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default FuncionarioTable;