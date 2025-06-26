import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from "recharts";
import { useUserContext } from "@/context/UserContext";
import Link from "next/link";
import Image from "next/image";

// Dados de exemplo para as vagas
const vagasData = [
  { id: 1, titulo: "Engenharia Civil", departamento: "Operações", vagas: 5, candidaturas: 23, dataLimite: "2023-12-15" },
  { id: 2, titulo: "Informática", departamento: "TI", vagas: 3, candidaturas: 18, dataLimite: "2023-12-20" },
  { id: 3, titulo: "Administração", departamento: "RH", vagas: 4, candidaturas: 15, dataLimite: "2023-12-10" },
  { id: 4, titulo: "Contabilidade", departamento: "Financeiro", vagas: 2, candidaturas: 12, dataLimite: "2023-12-05" },
  { id: 5, titulo: "Mecânica", departamento: "Manutenção", vagas: 6, candidaturas: 30, dataLimite: "2023-12-25" },
];

// Dados de exemplo para avaliações
const avaliacoesData = [
  { id: 1, nome: "Maria João", departamento: "Operações", mes: "Nov", nota: 7.5, status: "Avaliado" },
  { id: 2, nome: "António Salomão", departamento: "TI", mes: "Nov", nota: 8.2, status: "Avaliado" },
  { id: 3, nome: "Carlota Machava", departamento: "RH", mes: "Nov", nota: 8.5, status: "Avaliado" },
  { id: 4, nome: "Jorge Alberto", departamento: "Financeiro", mes: "Nov", nota: 7.0, status: "Pendente" },
  { id: 5, nome: "Helena Nhaca", departamento: "Manutenção", mes: "Nov", nota: 8.8, status: "Avaliado" },
];

// Dados de exemplo para usuários
const usuariosData = [
  { id: 1, nome: "Admin User", email: "admin@cfm.co.mz", role: "admin", status: "Ativo" },
  { id: 2, nome: "Supervisor RH", email: "supervisor.rh@cfm.co.mz", role: "supervisor", status: "Ativo" },
  { id: 3, nome: "Supervisor TI", email: "supervisor.ti@cfm.co.mz", role: "supervisor", status: "Ativo" },
  { id: 4, nome: "Estagiário 1", email: "estagiario1@cfm.co.mz", role: "estagiario", status: "Ativo" },
  { id: 5, nome: "Estagiário 2", email: "estagiario2@cfm.co.mz", role: "estagiario", status: "Inativo" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff4d4f'];

export default function Dashboard() {
  const { user, loading } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Dados para gráficos
  const dataGraficoVagas = [
    { name: 'Eng Civil', vagas: 5, candidaturas: 23 },
    { name: 'Informática', vagas: 3, candidaturas: 18 },
    { name: 'Administração', vagas: 4, candidaturas: 15 },
    { name: 'Contabilidade', vagas: 2, candidaturas: 12 },
    { name: 'Mecânica', vagas: 6, candidaturas: 30 },
  ];

  const dataGraficoAvaliacoes = [
    { name: 'Excelente', value: 2 },
    { name: 'Muito Bom', value: 5 },
    { name: 'Bom', value: 8 },
    { name: 'Regular', value: 1 },
    { name: 'Insuficiente', value: 0 },
  ];

  // Paginação
  const totalPages = Math.ceil(vagasData.length / itemsPerPage);
  const paginatedVagas = vagasData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Dashboard para Estagiário
  if (user?.roles.includes('estagiario')) {
    return (
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="fw-bold">Bem-vindo ao Sistema de Estágios da CFM</h1>
            <p className="lead">Acompanhe as vagas disponíveis e suas candidaturas</p>
          </div>
          <div className="col-md-4 text-end">
            <Image 
              src="/cfm-logo.png" 
              alt="CFM Logo" 
              width={150} 
              height={80} 
              className="img-fluid"
            />
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white h-100 rounded-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Vagas Disponíveis</h5>
                <h1 className="display-4 fw-bold">12</h1>
                <p className="card-text">Vagas abertas para estágio</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white h-100 rounded-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Minhas Candidaturas</h5>
                <h1 className="display-4 fw-bold">3</h1>
                <p className="card-text">Candidaturas enviadas</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-info text-white h-100 rounded-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Relatórios</h5>
                <h1 className="display-4 fw-bold">2</h1>
                <p className="card-text">Relatórios pendentes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header bg-light">
            <h2 className="h4 mb-0">Vagas Disponíveis</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Departamento</th>
                    <th>Vagas</th>
                    <th>Candidaturas</th>
                    <th>Data Limite</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedVagas.map((vaga) => (
                    <tr key={vaga.id}>
                      <td>{vaga.titulo}</td>
                      <td>{vaga.departamento}</td>
                      <td>{vaga.vagas}</td>
                      <td>{vaga.candidaturas}</td>
                      <td>{new Date(vaga.dataLimite).toLocaleDateString()}</td>
                      <td>
                        <button className="btn btn-sm btn-primary">Candidatar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginação */}
            <nav>
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Anterior</button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Próxima</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow mb-4">
              <div className="card-header bg-light">
                <h2 className="h4 mb-0">Distribuição de Vagas por Área</h2>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dataGraficoVagas}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="vagas" fill="#8884d8" name="Vagas" />
                    <Bar dataKey="candidaturas" fill="#82ca9d" name="Candidaturas" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-light">
                <h2 className="h4 mb-0">Links Úteis</h2>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <Link href="https://www.cfm.co.mz" target="_blank">
                      Site Oficial da CFM
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/regulamento-estagios">
                      Regulamento de Estágios
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/modelo-relatorio">
                      Modelo de Relatório de Estágio
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link href="/calendario-academico">
                      Calendário Acadêmico
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard para Supervisor
  if (user?.roles.includes('supervisor')) {
    return (
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="fw-bold">Painel do Supervisor - CFM Estágios</h1>
            <p className="lead">Acompanhe as avaliações dos estagiários</p>
          </div>
          <div className="col-md-4 text-end">
            <Image 
              src="/cfm-logo.png" 
              alt="CFM Logo" 
              width={150} 
              height={80} 
              className="img-fluid"
            />
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card bg-primary text-white h-100 rounded-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Avaliações</h5>
                <h1 className="display-4 fw-bold">15</h1>
                <p className="card-text">Avaliações realizadas</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-dark h-100 rounded-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Relatórios Pendentes</h5>
                <h1 className="display-4 fw-bold">4</h1>
                <p className="card-text">Relatórios não avaliados</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white h-100 rounded-3 shadow">
              <div className="card-body">
                <h5 className="card-title">Total Estagiários</h5>
                <h1 className="display-4 fw-bold">24</h1>
                <p className="card-text">Estagiários ativos</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header bg-light">
            <h2 className="h4 mb-0">Avaliações de Estagiários</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Departamento</th>
                    <th>Mês</th>
                    <th>Nota</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {avaliacoesData.map((avaliacao) => (
                    <tr key={avaliacao.id}>
                      <td>{avaliacao.nome}</td>
                      <td>{avaliacao.departamento}</td>
                      <td>{avaliacao.mes}</td>
                      <td>{avaliacao.nota}</td>
                      <td>
                        <span className={`badge ${avaliacao.status === 'Avaliado' ? 'bg-success' : 'bg-warning'}`}>
                          {avaliacao.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow mb-4">
              <div className="card-header bg-light">
                <h2 className="h4 mb-0">Distribuição de Avaliações</h2>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dataGraficoAvaliacoes}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-light">
                <h2 className="h4 mb-0">Evolução Mensal</h2>
              </div>
              <div className="card-body">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { name: 'Jan', nota: 7.2 },
                      { name: 'Fev', nota: 7.5 },
                      { name: 'Mar', nota: 7.8 },
                      { name: 'Abr', nota: 8.1 },
                      { name: 'Mai', nota: 8.3 },
                      { name: 'Jun', nota: 8.5 },
                    ]}
                  >
                    <XAxis dataKey="name" />
                    <YAxis domain={[6, 10]} />
                    <Tooltip />
                    <Line type="monotone" dataKey="nota" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard para Admin
  if (user?.roles.includes('admin')) {
    return (
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-8">
            <h1 className="fw-bold">Painel de Administração - CFM Estágios</h1>
            <p className="lead">Gerencie usuários e configurações do sistema</p>
          </div>
          <div className="col-md-4 text-end">
            <Image 
              src="/cfm-logo.png" 
              alt="CFM Logo" 
              width={150} 
              height={80} 
              className="img-fluid"
            />
          </div>
        </div>

        <div className="card shadow mb-4">
          <div className="card-header bg-light">
            <h2 className="h4 mb-0">Usuários do Sistema</h2>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Perfil</th>
                    <th>Status</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {usuariosData.map((usuario) => (
                    <tr key={usuario.id}>
                      <td>{usuario.nome}</td>
                      <td>{usuario.email}</td>
                      <td>
                        <span className={`badge ${
                          usuario.role === 'admin' ? 'bg-danger' : 
                          usuario.role === 'supervisor' ? 'bg-primary' : 'bg-success'
                        }`}>
                          {usuario.role}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${usuario.status === 'Ativo' ? 'bg-success' : 'bg-secondary'}`}>
                          {usuario.status}
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary me-2">Editar</button>
                        <button className="btn btn-sm btn-danger">Remover</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="card shadow mb-4">
              <div className="card-header bg-light">
                <h2 className="h4 mb-0">Configurações do Sistema</h2>
              </div>
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Período de Inscrições</label>
                    <div className="row">
                      <div className="col">
                        <input type="date" className="form-control" placeholder="Data Início" />
                      </div>
                      <div className="col">
                        <input type="date" className="form-control" placeholder="Data Fim" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Duração do Estágio (meses)</label>
                    <input type="number" className="form-control" defaultValue="6" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nota Mínima para Aprovação</label>
                    <input type="number" className="form-control" defaultValue="7.0" step="0.1" />
                  </div>
                  <button type="submit" className="btn btn-primary">Salvar Configurações</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card shadow">
              <div className="card-header bg-light">
                <h2 className="h4 mb-0">Estatísticas do Sistema</h2>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Total de Usuários
                    <span className="badge bg-primary rounded-pill">42</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Supervisores Ativos
                    <span className="badge bg-success rounded-pill">15</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Estagiários Ativos
                    <span className="badge bg-info rounded-pill">24</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Vagas Abertas
                    <span className="badge bg-warning rounded-pill">8</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Candidaturas Este Mês
                    <span className="badge bg-danger rounded-pill">56</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Caso o usuário não tenha nenhum dos roles
  return (
    <div className="container mt-5">
      <div className="alert alert-danger">
        <h4 className="alert-heading">Acesso Negado</h4>
        <p>Você não tem permissão para acessar esta página.</p>
        <hr />
        <p className="mb-0">Entre em contato com o administrador do sistema.</p>
      </div>
    </div>
  );
}