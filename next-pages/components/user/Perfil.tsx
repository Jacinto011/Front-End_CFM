import React, { useState, useEffect } from "react";
import { Card, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Table } from "reactstrap";
import { FaEdit, FaPowerOff, FaCheck, FaLock, FaTrashAlt } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { usuario_logado } from "@/components/lib/autenticar";
import Router, { useRouter } from "next/router";
import { useUserContext } from '@/context/UserContext'; // Certifique-se de que o caminho esteja correto


interface PerfilProps {
  use: {
    id: string;
  };
}

interface Role {
  id: number;
  name: string;
  isActive: boolean;
}

interface Log {
  id: number;
  timestamp: string;
  action: string;
  description: string;
}

interface UserDetailsProps {
  id_usuario: number;
  nome: string;
  apelido: string;
  username: string;
  email: string;
  password: string;
  contato1: string;
  contato2: string;
  ano_de_nascimento: string;
  idCidade: number;
  urlImage: string;
  estadoUsuario: number;
  roles: Role[];
  logs: Log[];
}

interface Cidades {
  idCidade: number;
  nomeCidade: string;
  idProvincia: number;
  nomeProvincia: string;
}

//const UserProfile: React.FC = () => {
const UserProfile: React.FC<PerfilProps> = ({ use }) => {
  const { user, logout, loading } = useUserContext();
  const [dataCidade, setDataCidade] = useState<Cidades[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [u, setU] = useState<UserDetailsProps | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPasswordOpen, setModalPasswordOpen] = useState(false);
  const [modalCancelOpen, setModalCancelOpen] = useState(false);
  const [showRolesTable, setShowRolesTable] = useState(false);
  const [showLogsTable, setShowLogsTable] = useState(false);
  const router = useRouter();
  const [editableUser, setEditableUser] = useState<UserDetailsProps | null>(null);
  const [newPassword, setNewPassword] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordChangeError, setPasswordChangeError] = useState<string | null>(null);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const toggleMessageModal = () => setModalMessageOpen(!modalMessageOpen);

  const showMessage = (message: string) => {
    setMessageContent(message);
    setModalMessageOpen(true);
  };


  useEffect(() => {
    console.log('Dados da Props: ', user);

    fetchUserData();
    fetchRolesData();
    fetchCidadesData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/usuarios?id=${user?.sub}`);
      if (!response.ok) throw new Error("Erro ao buscar dados do usuário.");
      const userData = await response.json();
      setU(userData);
      console.log('Dados de Usuario: ', userData);

      setEditableUser(userData);  // Inicializa com os dados do usuário para edição
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  const fetchRolesData = async () => {
    try {
      const response = await fetch(`/api/roles?id=${user?.sub}`);
      if (!response.ok) throw new Error("Erro ao buscar roles.");
      const rolesData = await response.json();
      console.log('Roles: ', rolesData);

      const formattedRoles = rolesData.map((role: any) => ({
        id: role.id_roles,
        name: role.roles,
        isActive: role.ativa,
      }));
      setRoles(formattedRoles);

      console.log('Roles Format: ', formattedRoles);

    } catch (error) {
      console.error("Erro ao buscar roles:", error);
    }
  };

  const fetchCidadesData = async () => {
    try {
      const response = await fetch("/api/cidades");
      if (!response.ok) throw new Error("Erro ao buscar cidades.");
      const cidadesData = await response.json();
      setDataCidade(cidadesData);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  };

  const toggleModal = () => setModalOpen(!modalOpen);
  const togglePasswordModal = () => setModalPasswordOpen(!modalPasswordOpen);
  const toggleCancelModal = () => setModalCancelOpen(!modalCancelOpen);
  const toggleRolesTable = () => setShowRolesTable(!showRolesTable);
  const toggleLogsTable = () => setShowLogsTable(!showLogsTable);

  const handleEditUser = async () => {
    if (editableUser) {
      try {
        const updatedUser = {
          ...editableUser,
          anoDeNascimento: editableUser.ano_de_nascimento
            ? new Date(editableUser.ano_de_nascimento).toISOString().split('T')[0]
            : null,
          estadoUsuario: editableUser.estadoUsuario ? 1 : 0,
        };

        await fetch(`/api/usuarios?id=${user?.sub}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
        //alert('Dados atualizados com sucesso.');
        showMessage('Dados atualizados com sucesso.');
      } catch (error) {
        showMessage('Falha ao atualizar os dados.');
        console.error('Erro ao atualizar dados:', error);
      }
    }
    toggleModal();
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordChangeError("As senhas não coincidem.");
      return;
    }

    try {
      // Envia a nova senha, o email e o token para a API
      const response = await fetch(`/api/usuarios?id =${user?.sub}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idUsuario: user?.sub,//Passar o id atraves das Props
          oldPassword: oldPassword,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Nao foi possivel redefinir senha de usuario, por favor tente novamente');
      }

      // Chamada de API para alterar a senha
      //alert("Senha alterada com sucesso!");
      showMessage('Senha alterada com sucesso.');
      togglePasswordModal();

    } catch (error) {
      showMessage('Falha ao alterar a senha');
      console.error("Falha ao alterar a senha:", error);
      setPasswordChangeError("Ocorreu um erro ao redefinir a senha, por favor tente mais tarde");

    } finally {
      //  setLoading(false); // Desativa o loading após o envio
    }
  };

  const handleCancelAccount = async () => {
    // Chamada de API para cancelar a conta
    try {
      // Envia a nova senha, o email e o token para a API
      const response = await fetch(`/api/usuarios?id=${user?.sub}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        showMessage('Nao foi possivel cancelar a esta conta, tente mais tarde');
        //alert('Nao foi possivel cancelar a esta conta, tente mais tarde');
        throw new Error('Erro ao cancelar a conta por favor tente mais tarde');
      }

      // Chamada de API para alterar a senha
      //alert("Conta cancelada com Sucesso!");
      showMessage('Conta cancelada com Sucesso!');
      router.push('/auth'); // Redireciona após o sucesso
      log();
      //user=null; 
      //togglePasswordModal();

    } catch (error) {
      showMessage('Falha ao cancelar a conta!');
      console.error("Erro ao cancelar a conta:", error);
      setPasswordChangeError("Ocorreu um erro ao cancelar a conta por favor tente mais tarde");
    }
    console.log("Conta cancelada com sucesso!");
    toggleCancelModal();
  };

  const log = () => {
    document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    localStorage.clear(); // Remove qualquer dado armazenado localmente
    sessionStorage.clear(); // Limpa a sessão atual
    //window.location.reload(); // Recarrega a página para limpar qualquer estado armazenado
  };

  return (
    <div className="mt-2">
      <Card className="p-4 shadow">
        <div className="d-flex flex-column flex-md-row align-items-center">
          {u?.urlImage && (
            <img
              src={u.urlImage}
              alt="User Profile"
              className="rounded-circle img-fluid mb-3 mb-md-0"
              style={{ maxWidth: '150px', width: '100%', height: 'auto' }}
            />
          )}

          <div className="ms-md-4">
            <h2>{u?.nome} {u?.apelido}</h2>
            <p className="text-muted">{u?.email}</p>
            <p>{u?.contato1}</p>
            <p>{u?.ano_de_nascimento}</p>
            <p>{u?.estadoUsuario === 1 ? "Status: Ativo" : "Status: Inativo"}</p>
            <div className="d-flex flex-column flex-md-row">
              <Button color="primary" onClick={toggleModal} className="mb-2 mb-md-0 me-md-2">
                <FaEdit className="me-2" />
                Editar Perfil
              </Button>
              <Button color="warning" onClick={togglePasswordModal} className="mb-2 mb-md-0 me-md-2">
                <FaLock className="me-2" />
                Alterar Senha
              </Button>
              <Button color="danger" onClick={toggleCancelModal} className="mb-2 mb-md-0">
                <FaTrashAlt className="me-2" />
                Cancelar Conta
              </Button>
            </div>
          </div>


        </div>

        {/* Tabela de Roles */}
        <div className="mt-4">
          <h4 onClick={toggleRolesTable} style={{ cursor: "pointer" }}>
            Roles do Usuário {showRolesTable ? "▲" : "▼"}
          </h4>
          {showRolesTable && (
            <Table className="table-hover col-12 col-md-4"  >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.id}</td>
                    <td>{role.name}</td>
                    <td>{role.isActive ? "Ativo" : "Inativo"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>

        {/* Tabela de Logs */}
        <div className="table-responsive mt-4">
          <h4 onClick={toggleLogsTable} style={{ cursor: "pointer" }}>
            Logs do Usuário {showLogsTable ? "▲" : "▼"}
          </h4>
          {showLogsTable && (
            <Table className="table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Data e Hora</th>
                  <th>Ação</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {u?.logs?.map((log) => (
                  <tr key={log.id}>
                    <td>{log.id}</td>
                    <td>{log.timestamp}</td>
                    <td>{log.action}</td>
                    <td>{log.description}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </Card>

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Editar Dados do Usuário</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="editNome">Nome</Label>
            <Input
              type="text"
              id="editNome"
              value={editableUser?.nome || ''}
              onChange={(e) =>
                setEditableUser((prev) => ({ ...prev!, nome: e.target.value }))
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="editApelido">Apelido</Label>
            <Input
              type="text"
              id="editApelido"
              value={editableUser?.apelido || ''}
              onChange={(e) =>
                setEditableUser((prev) => ({ ...prev!, apelido: e.target.value }))
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="editUsername">Username</Label>
            <Input
              type="text"
              id="editUsername"
              value={editableUser?.username || ''}
              onChange={(e) =>
                setEditableUser((prev) => ({ ...prev!, username: e.target.value }))
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="editEmail">Email</Label>
            <Input
              type="email"
              id="editEmail"
              value={editableUser?.email || ''}
              onChange={(e) =>
                setEditableUser((prev) => ({ ...prev!, email: e.target.value }))
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="editCidade">Cidade</Label>
            <Input
              type="select"
              id="editCidade"
              value={editableUser?.idCidade || ''}
              onChange={(e) =>
                setEditableUser((prev) => ({
                  ...prev!,
                  idCidade: parseInt(e.target.value, 10),
                }))
              }
            >
              <option value="" disabled>
                Selecione a cidade
              </option>
              {dataCidade.map((cidade) => (
                <option key={cidade.idCidade} value={cidade.idCidade}>
                  {cidade.nomeCidade} - {cidade.nomeProvincia}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="editContato1">Contato 1</Label>
            <Input
              type="text"
              id="editContato1"
              value={editableUser?.contato1 || ''}
              onChange={(e) =>
                setEditableUser((prev) => ({ ...prev!, contato1: e.target.value }))
              }
            />
          </FormGroup>

          <FormGroup>
            <Label for="editContato2">Contato 2</Label>
            <Input
              type="text"
              id="editContato2"
              value={editableUser?.contato2 || ''}
              onChange={(e) =>
                setEditableUser((prev) => ({ ...prev!, contato2: e.target.value }))
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="editAnoNascimento">Ano de Nascimento</Label>
            <Input
              type="date"
              id="editAnoNascimento"
              value={
                editableUser?.ano_de_nascimento
                  ? new Date(editableUser.ano_de_nascimento).toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) =>
                setEditableUser((prev) => ({
                  ...prev!,
                  anoDeNascimento: e.target.value,
                }))
              }
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditUser}>
            Salvar Alterações
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>


      {/* Modal de Alteração de Senha */}
      <Modal isOpen={modalPasswordOpen} toggle={togglePasswordModal}>
        <ModalHeader toggle={togglePasswordModal}>Alterar Senha</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="oldPassword">Digite a Senha Antiga</Label>
            <Input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="newPassword">Digite a Nova Senha</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirmar Senha</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordChangeError && (
              <p className="text-danger">{passwordChangeError}</p>
            )}
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePasswordChange}>
            Alterar Senha
          </Button>
          <Button color="secondary" onClick={togglePasswordModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de Confirmação para Cancelar Conta */}
      <Modal isOpen={modalCancelOpen} toggle={toggleCancelModal}>
        <ModalHeader toggle={toggleCancelModal}>Confirmar Cancelamento</ModalHeader>
        <ModalBody>
          <p>Tem certeza de que deseja cancelar sua conta? Essa ação não pode ser desfeita.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleCancelAccount}>
            Confirmar
          </Button>
          <Button color="secondary" onClick={toggleCancelModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

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
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  return usuario_logado(context);
};

export default UserProfile;
