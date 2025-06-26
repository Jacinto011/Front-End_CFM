import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import apiFetch from "../../src/service/api";

interface UserData {
  idUsuario: string;
  nome: string;
  apelido: string;
  username: string;
  email: string;
  password: string;
  anoDeNascimento: string;
  idCidade: number;
  contato1: string;
  contato2: string;
  urlImage: string;
  estadoUsuario: boolean;
  eliminado: boolean;
}

interface Cidade {
  idCidade: number;
  nomeCidade: string;
  idProvincia: number;
  nomeProvincia: string;
}

export default function Cadastro() {
  const router = useRouter();
  const [cidades, setCidades] = useState<Cidade[]>([]);
  const [step, setStep] = useState<number>(1);
  const [loadingCidades, setLoadingCidades] = useState<boolean>(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
 // const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<UserData>({
    idUsuario: "",
    nome: "",
    apelido: "",
    username: "",
    email: "",
    password: "",
    anoDeNascimento: "",
    idCidade: 0,
    contato1: "",
    contato2: "",
    urlImage: "",
    estadoUsuario: true,
    eliminado: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCidades = async () => {
      try {
        const response = await fetch("/api/cidades");
        if (!response.ok) throw new Error("Erro ao buscar cidades");
        const data = await response.json();
        setCidades(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoadingCidades(false);
      }
    };

    fetchCidades();
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setUser((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked :
          type === "number" ? Number(value) :
            value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files[0]) {
    const file = e.target.files[0];

    // Validação do tipo de arquivo
    if (!file.type.match('image.*')) {
      setErrors((prev) => ({ ...prev, urlImage: "Por favor, selecione um arquivo de imagem" }));
      return;
    }

    // Validação do tamanho do arquivo (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, urlImage: "A imagem deve ter no máximo 2MB" }));
      return;
    }

    // Criar preview da imagem
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Enviar a imagem para o servidor
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar imagem');
      }

      const data = await response.json();
      setUser((prev) => ({ ...prev, urlImage: data.imagePath }));
      setErrors((prev) => ({ ...prev, urlImage: "" }));
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      setErrors((prev) => ({ ...prev, urlImage: "Erro ao enviar imagem" }));
    }
  }
};

  const removeImage = async () => {
  if (user.urlImage && !user.urlImage.startsWith('data:')) {
    try {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imagePath: user.urlImage }),
      });
    } catch (error) {
      console.error('Erro ao remover imagem:', error);
    }
  }
  
  setPreviewImage(null);
  setUser((prev) => ({ ...prev, urlImage: "" }));
};

  function validateStep1(): boolean {
    const newErrors: { [key: string]: string } = {};

    // Validação de nome
    if (!user.nome.trim()) newErrors.nome = "Nome é obrigatório";
    else if (user.nome.length < 3) newErrors.nome = "Nome deve ter pelo menos 3 caracteres";

    // Validação de apelido (opcional)
    if (user.apelido && user.apelido.length < 2) newErrors.apelido = "Apelido deve ter pelo menos 2 caracteres";

    // Validação de username
    if (!user.username.trim()) newErrors.username = "Username é obrigatório";
    else if (user.username.length < 4) newErrors.username = "Username deve ter pelo menos 4 caracteres";
    else if (!/^[a-zA-Z0-9_]+$/.test(user.username)) newErrors.username = "Username só pode conter letras, números e underscores";

    // Validação de email
    if (!user.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) newErrors.email = "Email inválido";
    else if (!/^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|icloud\.com|yahoo\.com)$/i.test(user.email)) {
      newErrors.email = "Apenas emails do Gmail, Hotmail, Outlook, iCloud ou Yahoo são aceitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: { [key: string]: string } = {};
    const today = new Date();
    const birthDate = new Date(user.anoDeNascimento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Validação de data de nascimento
    if (!user.anoDeNascimento) newErrors.anoDeNascimento = "Data de nascimento é obrigatória";
    else if (age < 18) newErrors.anoDeNascimento = "Você deve ter pelo menos 18 anos";

    // Validação de cidade
    if (user.idCidade <= 0) newErrors.idCidade = "Selecione uma cidade";

    // Formata o número para o padrão +258 84 576 9500
    if (user.contato1 && user.contato1.trim()) {
      const cleanedContato = user.contato1.replace(/\s/g, '');
      const formattedNumber = cleanedContato.replace(
        /^(\+258|0)?([82-87])([0-9]{3})([0-9]{4})$/,
        (match, p1, p2, p3, p4) => {
          return `+258 ${p2} ${p3} ${p4}`;
        }
      );
      setUser(prev => ({ ...prev, contato1: formattedNumber }));
    }

    // Formata o número alternativo (opcional)
    if (user.contato2 && user.contato2.trim()) {
      const cleanedContato2 = user.contato2.replace(/\s/g, '');
      const formattedNumber = cleanedContato2.replace(
        /^(\+258|0)?([82-87])([0-9]{3})([0-9]{4})$/,
        (match, p1, p2, p3, p4) => {
          return `+258 ${p2} ${p3} ${p4}`;
        }
      );
      setUser(prev => ({ ...prev, contato2: formattedNumber }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep3(): boolean {
    const newErrors: { [key: string]: string } = {};

    // Validação de senha forte
    if (!user.password.trim()) newErrors.password = "Senha é obrigatória";
    else if (user.password.length < 5) newErrors.password = "Senha deve ter pelo menos 8 caracteres";
    else if (!/[A-Z]/.test(user.password)) newErrors.password = "Senha deve conter pelo menos uma letra maiúscula";
    else if (!/[a-z]/.test(user.password)) newErrors.password = "Senha deve conter pelo menos uma letra minúscula";
    else if (!/[0-9]/.test(user.password)) newErrors.password = "Senha deve conter pelo menos um número";
    else if (!/[^A-Za-z0-9]/.test(user.password)) newErrors.password = "Senha deve conter pelo menos um caractere especial";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  }

  function prevStep() {
    setStep(step - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!validateStep3()) return;

  try {
    const novoUsuario = {
      ...user,
      idUsuario: "U" + Date.now(),
      // Garantir que urlImage seja apenas o caminho, não os dados base64
      urlImage: user.urlImage.startsWith('data:') ? '' : user.urlImage
    };

    const response = await fetch("/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoUsuario),
    });

    if (!response.ok) {
      alert("Falha ao cadastrar usuário");
      throw new Error("Erro ao cadastrar usuário");
    }

    alert("Usuário cadastrado com sucesso!");
    router.push("/");
  } catch (error: any) {
    console.error("Erro no cadastro:", error);
    alert("Erro ao cadastrar usuário: " + (error.message || "Erro desconhecido"));
  }
}

  return (
    <div className="container mt-5" style={{ maxWidth: 500 }}>
      <h2 className="mb-4">Cadastro de Usuário</h2>

      <div className="progress mb-4">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
          aria-valuenow={step === 1 ? 33 : step === 2 ? 66 : 100}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>

      {step === 1 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <h4 className="mb-3">Informações Pessoais</h4>

          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome*</label>
            <input
              id="nome"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              name="nome"
              placeholder="Nome completo"
              value={user.nome}
              onChange={handleChange}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="apelido" className="form-label">Apelido</label>
            <input
              id="apelido"
              className={`form-control ${errors.apelido ? "is-invalid" : ""}`}
              name="apelido"
              placeholder="Apelido (opcional)"
              value={user.apelido}
              onChange={handleChange}
            />
            {errors.apelido && <div className="invalid-feedback">{errors.apelido}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username*</label>
            <input
              id="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
              name="username"
              placeholder="Nome de usuário"
              value={user.username}
              onChange={handleChange}
            />
            {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            <div className="form-text">Use apenas letras, números e underscores</div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email*</label>
            <input
              id="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              type="email"
              name="email"
              placeholder="exemplo@gmail.com"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            <div className="form-text">Apenas emails do Gmail, Hotmail, Outlook, iCloud ou Yahoo</div>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Próximo
            </button>
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
          <h4 className="mb-3">Informações Adicionais</h4>

          <div className="mb-3">
            <label htmlFor="anoDeNascimento" className="form-label">Data de Nascimento*</label>
            <input
              id="anoDeNascimento"
              className={`form-control ${errors.anoDeNascimento ? "is-invalid" : ""}`}
              type="date"
              name="anoDeNascimento"
              value={user.anoDeNascimento}
              onChange={handleChange}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
            />
            {errors.anoDeNascimento && <div className="invalid-feedback">{errors.anoDeNascimento}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="idCidade" className="form-label">Cidade*</label>
            <select
              id="idCidade"
              className={`form-select ${errors.idCidade ? "is-invalid" : ""}`}
              name="idCidade"
              value={user.idCidade}
              onChange={handleChange}
              disabled={loadingCidades}
            >
              <option value={0}>Selecione sua cidade</option>
              {cidades.map((cidade) => (
                <option key={cidade.idCidade} value={cidade.idCidade}>
                  {cidade.nomeCidade} - {cidade.nomeProvincia}
                </option>
              ))}
            </select>
            {errors.idCidade && <div className="invalid-feedback">{errors.idCidade}</div>}
            {loadingCidades && <div className="form-text">Carregando cidades...</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="contato1" className="form-label">Contato Principal*</label>
            <input
              id="contato1"
              className={`form-control ${errors.contato1 ? "is-invalid" : ""}`}
              name="contato1"
              placeholder="Ex: 84 123 4567"
              value={user.contato1}
              onChange={handleChange}
            />
            {errors.contato1 && <div className="invalid-feedback">{errors.contato1}</div>}
            <div className="form-text">Use formato moçambicano (82, 83, 84, 85, 86 ou 87)</div>
          </div>

          <div className="mb-3">
            <label htmlFor="contato2" className="form-label">Contato Alternativo</label>
            <input
              id="contato2"
              className={`form-control ${errors.contato2 ? "is-invalid" : ""}`}
              name="contato2"
              placeholder="Contato alternativo (opcional)"
              value={user.contato2}
              onChange={handleChange}
            />
            {errors.contato2 && <div className="invalid-feedback">{errors.contato2}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="urlImage" className="form-label">Foto de Perfil</label>
            <input
              id="urlImage"
              type="file"
              className={`form-control ${errors.urlImage ? "is-invalid" : ""}`}
              accept="image/*"
              onChange={handleImageChange}
              
            />
            {errors.urlImage && <div className="invalid-feedback">{errors.urlImage}</div>}
            <div className="form-text">Formatos aceitos: JPG, PNG (máx. 2MB)</div>

            {previewImage && (
              <div className="mt-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-thumbnail"
                  style={{ maxWidth: '150px', maxHeight: '150px' }}
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger ms-2"
                  onClick={removeImage}
                >
                  Remover
                </button>
              </div>
            )}
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-between">
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Voltar
            </button>
            <button type="submit" className="btn btn-primary">
              Próximo
            </button>
          </div>
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit}>
          <h4 className="mb-3">Segurança</h4>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha*</label>
            <input
              id="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              type="password"
              name="password"
              placeholder="Crie uma senha forte"
              value={user.password}
              onChange={handleChange}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            <div className="form-text">
              A senha deve conter:
              <ul>
                <li>Pelo menos 8 caracteres</li>
                <li>Letras maiúsculas e minúsculas</li>
                <li>Pelo menos um número</li>
                <li>Pelo menos um caractere especial</li>
              </ul>
            </div>
          </div>

          <div className="d-grid gap-2 d-md-flex justify-content-md-between">
            <button type="button" className="btn btn-secondary" onClick={prevStep}>
              Voltar
            </button>
            <button type="submit" className="btn btn-primary">
              Finalizar Cadastro
            </button>
          </div>
        </form>
      )}
    </div>
  );
}