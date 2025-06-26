import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";




// Validação de email com Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
});

const RecuperarSenhaForm = () => {
  const [loading, setLoading] = useState(false);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const toggleMessageModal = () => setModalMessageOpen(!modalMessageOpen);

  const showMessage = (message: string) => {
    setMessageContent(message);
    setModalMessageOpen(true);
  };

  // Configuração do Formik
  const formik = useFormik({
    initialValues: { email: " " },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true); // Ativa o estado de loading

      try {
        // Gerar token de recuperação
        const token = await gerarTokenUsuario(values.email);
        if (!token) {
          throw new Error("Nao foi possivel obter o email do usuario.");
        }

        // Enviar email com o token
        await enviarEmail(values.email, token);

        // alert("Email enviado com sucesso!");
        showMessage('Email enviado com sucesso!');
      } catch (error) {
        showMessage(`Falha ao enviar email de recuperacao!`);
        // console.error("Erro:", error.message);
        //alert(`Ocorreu um erro: ${error.message}`);
      } finally {
        setLoading(false); // Desativa o estado de loading
      }
    },
  });

  // Método para gerar token de recuperação de senha
  const gerarTokenUsuario = async (email) => {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Erro ao gerar token");
      }

      const data = await response.json();
      if (!data.token) {
        throw new Error("Token não retornado pela API");
      }

      //  console.log("Token gerado com sucesso:", data.token);
      return data.token;
    } catch (error) {
      //  console.error("Erro ao gerar token:", error.message);
      // alert(`Erro ao gerar token: ${error.message}`);
    }
  };

  // Método para enviar email com o token
  const enviarEmail = async (email, token) => {
    console.log(`Foi lhe concebido um codigo de autenticacao para recuperares a sua senha clique no link abaixo para redefinir a nova a senha. Clique aqui:http://localhost:3000/auth/redefinir-senha?token=${token}&email=${email}`);

    try {
      const response = await fetch("/api/Email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Recuperação de Senha",
          email,
          message: `Foi lhe concebido um codigo de autenticacao para recuperares a sua senha clique no link abaixo para redefinir a nova a senha. Clique aqui:http://localhost:3000/auth/redefinir-senha?token=${token}&email=${email}`,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Erro ao enviar email");
      }
      showMessage(`Email enviado com sucesso!`);
      //  console.log("Email enviado com sucesso!");
    } catch (error) {
      showMessage(`Erro ao enviar email: ${error}`);
      //console.error("Erro ao enviar email:", error.message);
      //alert(`Erro ao enviar email: ${error.message}`);
    }
  };

  return (
    <div className="container d-flex flex-column" style={{ fontFamily: "-moz-initial", fontSize: "14px" }}>
      <div className="row vh-100">
        <div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
          <div className="d-table-cell align-middle">
            <div className="text-center mt-4">
              <h1 className="h2">Recuperar Senha</h1>
              <p className="lead">
                Por favor, insira seu email para recuperar sua senha.
              </p>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="m-sm-4">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        className={`form-control form-control-lg ${formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                          }`}
                        type="email"
                        name="email"
                        placeholder="Digite seu email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-center mt-3">
                      <button
                        type="submit"
                        className="btn btn-lg btn-primary"
                        disabled={formik.isSubmitting || loading}
                      >
                        {loading ? "Enviando..." : "Enviar"}
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
            <div className="text-center">
              <Link href="/">Voltar para login</Link>
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

export default RecuperarSenhaForm;
