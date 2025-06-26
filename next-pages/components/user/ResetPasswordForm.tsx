import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

// Validação do formulário com Yup
const validationSchema = Yup.object({
  newPassword: Yup.string()
    .required("Nova senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .matches(/(?=.*[a-z])/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/(?=.*[A-Z])/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/(?=.*\d)/, "A senha deve conter pelo menos um número"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), ''], "As senhas devem corresponder")
    .required("Confirmação da senha é obrigatória")
});

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [isValidToken, setIsValidToken] = useState(false); // Para controlar a validade do token
  const router = useRouter();
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const toggleMessageModal = () => setModalMessageOpen(!modalMessageOpen);

  const showMessage = (message: string) => {
    setMessageContent(message);
    setModalMessageOpen(true);
  };

  // UseEffect para validar o token
  useEffect(() => {
    const { token, email } = router.query;

    if (token && email) {
      setToken(token);
      setEmail(email);

      // Chama a função para validar o token
      validateToken(token);
    }
  }, [router.query]);

  const validateToken = async (token) => {
    try {
      // Chama a API para validar o token
      const response = await fetch(`/api/token?token=${token}`, {
        method: 'GET',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.usado === 0) {
          setIsValidToken(true); // O token é válido
          //  console.log('Nao Usado');

        } else {
          setIsValidToken(false); // O token não é válido
          //  console.log('Usado');

          //alert("Token inválido ou expirado.");
          showMessage('Token invalido ou expirado!');
        }
        console.log('Dados de Usado: ', data.usado);

      } else {
        setIsValidToken(false);
        showMessage('Erro ao validar token');
        //alert("Erro ao validar o token.");
      }
    } catch (error) {
      console.error("Erro ao validar o token:", error);
      setIsValidToken(false);
      showMessage('Ocorreu um erro ao validar  token');
      //alert("Ocorreu um erro ao tentar validar o token.");
    }
  };

  // Função que será chamada ao submeter o formulário
  const handleSubmit = async (values) => {
    if (!isValidToken) {
      showMessage('O token não é válido. Não é possível redefinir a senha!');
      alert("O token não é válido. Não é possível redefinir a senha.");
      return;
    }

    setLoading(true); // Ativa o estado de loading

    try {
      // Envia a nova senha, o email e o token para a API
      const response = await fetch(`/api/usuarios?token=${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: values.newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao redefinir a senha');
      }

      showMessage('Senha redefinida com sucesso!');
      router.push('/auth'); // Redireciona após o sucesso

    } catch (error) {
      console.error("Erro ao redefinir a senha:", error);
      showMessage('Ocorreu um erro ao redefinir a senha!');
      //alert("Ocorreu um erro ao redefinir a senha.");
    } finally {
      setLoading(false); // Desativa o loading após o envio
    }
  };

  // Configuração do Formik
  const formik = useFormik({
    initialValues: { newPassword: "", confirmPassword: "" },
    validationSchema,
    onSubmit: handleSubmit,
  });

  if (!isValidToken) {
    return (
      <div className="container text-center my-5" style={{ fontFamily: "-moz-initial", fontSize: "14px" }}>
        <div className="alert alert-danger shadow-lg p-4 rounded">
          <h2 className="display-5">Token Inválido ou Expirado</h2>
          <p className="mt-3">
            Parece que o token fornecido não é válido ou já expirou.
            <br /> Por favor, solicite um novo link para redefinir sua senha.
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={() => window.location.href = '/auth/recuperar-senha'}
          >
            Solicitar Novo Token
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="container d-flex flex-column">
      <div className="row vh-100">
        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div className="d-table-cell align-middle">
            <div className="text-center mt-4">
              <h1 className="h2">Redefinir Senha</h1>
              <p className="lead">
                Por favor, insira sua nova senha e confirme-a.
              </p>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="m-sm-4">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Nova Senha</label>
                      <input
                        className={`form-control form-control-lg ${formik.touched.newPassword && formik.errors.newPassword
                            ? "is-invalid"
                            : ""
                          }`}
                        type="password"
                        name="newPassword"
                        placeholder="Digite sua nova senha"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.newPassword && formik.errors.newPassword ? (
                        <div className="invalid-feedback">
                          {formik.errors.newPassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirmar Senha</label>
                      <input
                        className={`form-control form-control-lg ${formik.touched.confirmPassword && formik.errors.confirmPassword
                            ? "is-invalid"
                            : ""
                          }`}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirme sua nova senha"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="invalid-feedback">
                          {formik.errors.confirmPassword}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary"
                        disabled={formik.isSubmitting || loading}
                      >
                        {loading ? "Redefinindo..." : "Redefinir Senha"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default ResetPasswordForm;
