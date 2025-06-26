import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Card, CardBody, CardTitle, CardSubtitle, Button,
  Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Row, Col
} from "reactstrap";
import { FaTrash, FaEdit } from "react-icons/fa"; // Importando ícones
import { Layout } from '@/layout';
import { usuario_logado } from '@/components/lib/autenticar';

interface Role {
  name: string;
  isActive: boolean;
}

interface UserDetailsProps {
  urlImage: string;
  id_usuario: number;
  nome: string;
  apelido: string;
  email: string;
  contato1: string;
  ano_de_nascimento: string;
  username: string;
  contato2: string;
  nomeCidade: string;
  idCidade: number;
  estadoUsuario: boolean;
}

interface Cidades {
  idCidade: number;
  nomeCidade: string;
  idProvincia: number;
  nomeProvincia: string;
}

export default function UserDetails() {
  const [dataCidade, setDataCidade] = useState<Cidades[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState<string>(''); // Role selecionada no dropdown
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false); // Modal para edição de usuário
  const [editedUser, setEditedUser] = useState<UserDetailsProps | null>(null); // Estado para guardar dados editados
  const availableRoles = ['admin', 'estagiario', 'supervisor']; // Lista de opções de roles
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const toggleMessageModal = () => setModalMessageOpen(!modalMessageOpen);

  const showMessage = (message: string) => {
    setMessageContent(message);
    setModalMessageOpen(true);
  };


  useEffect(() => {
    if (id) {
      fetch(`/api/usuarios?id=${id}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setEditedUser(data);
        })
        .catch(error => console.error('Erro ao buscar usuário:', error));

      fetch(`/api/roles?id=${id}`)
        .then(response => response.json())
        .then(data => {
          const formattedRoles = data.map((role: any) => ({
            name: role.roles,
            isActive: role.ativa === 1,
          }));
          setRoles(formattedRoles);
        })
        .catch(error => console.error('Erro ao buscar roles:', error));
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/cidades');
      if (!response.ok) {
        throw new Error('Erro ao buscar dados.');
      }
      const result = await response.json();
      setDataCidade(result);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      setError('Erro ao buscar dados.');
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleEditModal = () => setEditModalOpen(!editModalOpen);

  const handleAddRole = async () => {
    if (newRole.trim() && !roles.some(role => role.name === newRole)) {
      try {
        const response = await fetch(`/api/roles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idUsuario: id, roles: newRole }),
        });

        if (!response.ok) {
          throw new Error('Erro ao adicionar a role.');
        }

        const createdRole = await response.json();
        setRoles([...roles, { name: createdRole.name, isActive: true }]);
        setNewRole('');
        //alert();
        showMessage('Role adicionada com sucesso.');
      } catch (error) {
        showMessage('Erro ao adicionar role.');
        //alert('Erro ao adicionar role.');
      }
    } else {
      showMessage('Role já existe ou inválida.');
      //alert('Role já existe ou inválida.');
    }
  };

  const handleToggleRole = async (roleName: string) => {
    const role = roles.find(r => r.name === roleName);
    if (!role) {
      showMessage('Role não encontrada.');
      //alert('Role não encontrada.');
      return;
    }

    try {
      const action = role.isActive ? 'desativar' : 'ativar';

      const response = await fetch(`/api/roles?action=${action}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuario: id,
          roles: roleName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${action} a role.`);
      }

      setRoles(
        roles.map(r => r.name === roleName ? { ...r, isActive: !r.isActive } : r
        )
      );
      showMessage(`Role ${roleName} ${action === 'ativar' ? 'ativada' : 'desativada'} com sucesso.`);
      //alert(`Role ${roleName} ${action === 'ativar' ? 'ativada' : 'desativada'} com sucesso.`);
    } catch (error) {
      showMessage('Erro ao atualizar a role. Tente novamente.');
      //alert('Erro ao atualizar a role. Tente novamente.');
    }
  };

  const handleEditUser = async () => {
    if (editedUser) {
      try {
        const updatedUser = {
          ...editedUser,
          anoDeNascimento: editedUser.ano_de_nascimento
            ? new Date(editedUser.ano_de_nascimento).toISOString().split('T')[0]
            : null,
          estadoUsuario: editedUser.estadoUsuario ? 1 : 0,
        };

        await fetch(`/api/usuarios?id=${editedUser.id_usuario}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
        showMessage('Dados atualizados com sucesso.');
        //alert('Dados atualizados com sucesso.');
      } catch (error) { }
    }
    toggleEditModal();
  };

  const handleDeleteUser = async () => {
    if (confirm("Tem certeza de que deseja eliminar este usuário?")) {
      try {
        await fetch(`/api/usuarios?id=${user?.id_usuario}`, {
          method: 'DELETE',
        });
        showMessage('Usuario eliminado com sucesso!');
        router.push("/usuarios");
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
      }
    }
  };

  return (
    <div className="mt-2">
      {user ? (
        <Card>
          <CardBody>
            <Row>
              <Col sm="12" md="4">
                <img src={user.urlImage} alt="Avatar" className="rounded-circle w-full sm:w-24 md:w-32" />
              </Col>
              <Col sm="12" md="8">
                <h2>{user.username} <FaEdit onClick={toggleEditModal} style={{ cursor: 'pointer' }} /></h2>
                <p>{user.email}</p>
                <p>{user.contato1}</p>
                <p>{user.ano_de_nascimento}</p>
                <p><strong>Status:</strong> {user.estadoUsuario ? 'Ativo' : 'Inativo'}</p>
              </Col>
            </Row>

            <div className="mt-5">
              <h5>Roles</h5>
              <Row>
                <Col sm="12" md="4">
                  <FormGroup className="mb-3 d-flex align-items-center">
                    <Label for="roleSelect" className="me-3">Adicionar Role</Label>
                    <Input
                      type="select"
                      id="roleSelect"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      className="me-2"
                    >
                      <option value="" disabled>Selecione uma Role</option>
                      {availableRoles.map((role, index) => (
                        <option key={index} value={role}>
                          {role}
                        </option>
                      ))}
                    </Input>
                    <Button color="primary" onClick={handleAddRole}>
                      Adicionar Role
                    </Button>
                  </FormGroup>
                </Col>
              </Row>

              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={index}>
                      <td>{role.name}</td>
                      <td>
                        {role.isActive ? (
                          <span className="text-success">Ativo</span>
                        ) : (
                          <span className="text-danger">Desativado</span>
                        )}
                      </td>
                      <td>
                        <Button
                          color={role.isActive ? 'danger' : 'success'}
                          onClick={() => handleToggleRole(role.name)}
                        >
                          {role.isActive ? 'Desativar' : 'Ativar'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button color="danger" onClick={handleDeleteUser} className="mt-3">
                <FaTrash className="me-2" />
                Eliminar Usuário
              </Button>

              <Button color="secondary" onClick={() => router.back()} className="mt-3 ms-2">
                Voltar
              </Button>
            </div>

            {/* Modal para Edição do Usuário */}
            <Modal isOpen={editModalOpen} toggle={toggleEditModal}>
              <ModalHeader toggle={toggleEditModal}>Editar Dados do Usuário</ModalHeader>
              <ModalBody>
                <FormGroup>
                  <Label for="editNome">Nome</Label>
                  <Input
                    type="text"
                    id="editNome"
                    value={editedUser?.nome || ''}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, nome: e.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="editApelido">Apelido</Label>
                  <Input
                    type="text"
                    id="editApelido"
                    value={editedUser?.apelido || ''}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, apelido: e.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="editUserName">UserName</Label>
                  <Input
                    type="text"
                    id="editUserName"
                    value={editedUser?.username || ''}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, username: e.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="editCidade">Cidade</Label>
                  <select
                    id="editCidade"
                    value={editedUser?.nomeCidade || ''}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, nomeCidade: e.target.value }))
                    }
                    className="form-control"
                  >
                    <option value="" disabled>Selecione a cidade</option>
                    {/* Gerando as opções de cidades dinamicamente */}
                    {dataCidade.map((cidade) => (
                      <option key={cidade.idCidade} value={cidade.nomeCidade}>
                        {cidade.nomeCidade} - {cidade.nomeProvincia}
                      </option>
                    ))}
                  </select>
                </FormGroup>

                <FormGroup>
                  <Label for="editContacto1">Contacto 1</Label>
                  <Input
                    type="text"
                    id="editContacto1"
                    value={editedUser?.contato1 || ''}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, contato1: e.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="editContacto2">Contacto 2</Label>
                  <Input
                    type="text"
                    id="editContacto2"
                    value={editedUser?.contato2 || ''}
                    onChange={(e) =>
                      setEditedUser((prev) => ({ ...prev!, contato2: e.target.value }))
                    }
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="editEstado">Estado</Label>
                  <select
                    id="editEstado"
                    value={editedUser?.estadoUsuario ? '1' : '0'}
                    onChange={(e) =>
                      setEditedUser((prev) => ({
                        ...prev!,
                        estadoUsuario: e.target.value === '1',
                      }))
                    }
                    className="form-control"
                  >
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </select>
                </FormGroup>


              </ModalBody>

              <ModalFooter>
                <Button color="primary" onClick={handleEditUser}>
                  Salvar Alterações
                </Button>
                <Button color="secondary" onClick={toggleEditModal}>
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </CardBody>
        </Card>
      ) : (
        <p>Carregando...</p>
      )}
      <Modal isOpen={modalMessageOpen} toggle={toggleMessageModal}>
        <ModalHeader toggle={toggleMessageModal}>Mensagem</ModalHeader>
        <ModalBody>{messageContent}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleMessageModal}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

UserDetails.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (context: any) => {
  const result = await usuario_logado(context);

  if (result.redirect) {
    return result; // Redireciona se necessário
  }

  return {
    props: result.props, // Passa as props para o componente
  };
}

