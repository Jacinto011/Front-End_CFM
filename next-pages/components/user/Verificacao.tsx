import React, { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

// Validação do código 2FA com Yup
const validationSchema = Yup.object({
  code: Yup.string()
    .length(6, "O código deve ter 6 dígitos")
    .required("O código é obrigatório"),
});

const Verificacao2FAForm = () => {
  const router = useRouter();
  const { email } = router.query;
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");

  const toggleMessageModal = () => setModalMessageOpen(!modalMessageOpen);

  const showMessage = (message: string) => {
    setMessageContent(message);
    setModalMessageOpen(true);
  };



  const formik = useFormik({
    initialValues: { code: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        //const response = await fetch(`/api/codigo?email=${email}&codigo=${values.code}`);
        const response = await fetch(`/api/codigo?codigo=${values.code}&email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          //body: JSON.stringify(payload),
        });

        if (!response.ok) {
          
          //alert("Codigo de Verificacao de Conta invalido!");
          showMessage('Codigo de Verificacao de Conta invalido!');
          resetForm();
          inputsRef.current.forEach((input) => {
            if (input) input.value = "";
          });
          throw new Error("Erro ao cadastrar usuário");
        }
        showMessage('A sua conta foi cadastrada com sucesso! Faca o login');
       // alert("A sua conta foi cadastrada com sucesso! Faca o login");

        resetForm();
        inputsRef.current.forEach((input) => {
          if (input) input.value = "";
        });
        router.push(`/auth`);

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        showMessage('Codigo de Verificacao de Conta invalido!');
        //alert("Codigo de Verificacao de Conta invalido!");
        resetForm();
        inputsRef.current.forEach((input) => {
          if (input) input.value = "";
        });
      } finally {
        setLoading(false);
      }
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const value = e.target.value;
    if (value.length === 1 && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
    formik.setFieldValue(
      "code",
      inputsRef.current.map((input) => input?.value || "").join("")
    );
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100" style={{ fontFamily: "-moz-initial", fontSize: "14px" }}>
      <div className="row w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
          <div className="text-center mb-4">
            <h1 className="h3">Verificação da Conta</h1>
            <p className="lead">
              Insira o código de 6 dígitos enviado para seu email.
            </p>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div
                  className="code-inputs d-flex justify-content-center gap-2 mb-3"
                  style={{ maxWidth: "100%" }}
                >
                  {[...Array(6)].map((_, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      ref={(el) => (inputsRef.current[idx] = el)}
                      onChange={(e) => handleInputChange(e, idx)}
                      className="form-control text-center"
                      style={{
                        width: "48px",
                        fontSize: "20px",
                        padding: "10px",
                      }}
                    />
                  ))}
                </div>
                {formik.errors.code && (
                  <div className="text-danger text-center mb-2">
                    {formik.errors.code}
                  </div>
                )}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100"
                    disabled={formik.isSubmitting || loading}
                  >
                    {loading ? "Verificando..." : "Verificar"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-3">
            <p className="small">
              Não recebeu o código?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => alert("Código reenviado!")}
              >
                Reenviar código
              </button>
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .code-inputs {
          flex-wrap: wrap;
        }

        @media (min-width: 768px) {
          .code-inputs {
            flex-wrap: nowrap;
          }
        }

        @media (max-width: 576px) {
          .code-inputs {
            gap: 10px;
          }

          .form-control {
            width: 40px !important;
            padding: 8px !important;
            font-size: 16px !important;
          }

          .btn {
            font-size: 14px;
            padding: 10px;
          }
        }
      `}</style>
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

export default Verificacao2FAForm;
