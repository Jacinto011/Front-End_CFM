
        import React, { useState } from "react";
        import { NoLayout } from "@/layout";
        import FormLogin from "@/components/auth/formlogin";
        import { usuario_guest } from "@/components/lib/autenticar";
    
        export default function Login() {
          const [error, setError] = useState<string | null>(null);
        
          return (
            <div
              className="d-flex justify-content-center align-items-center min-vh-100"
              style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                backgroundImage: "url('../img/photos/cfm7.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay escuro para melhor contraste */}
              <div
                style={{
                  position: "absolute",
                  //top: 0,
                  //left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)", // Ajuste a opacidade conforme necessário
                }}
              ></div>
        
              {/* Formulário Centralizado */}
              <div className="container z-1 position-relative" style={{ width: "100%", maxWidth: "600px", fontFamily:"-moz-initial", fontSize:"18px"}}>
                <div className="text-center mt-4">
                  <h1 className="h2 text-white">Bem-vindo!</h1>
                  <p className="lead text-white ">Faça a autenticação da sua conta</p>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="m-sm-4">
                      <div className="text-center">
                        <img
                          src="../img/photos/cfm12.jpg"
                          alt="Logo"
                          className="img-fluid rounded-circle"
                          width="132"
                          height="132"
                        />
                      </div>
                      {error && (
                        <div className="alert alert-danger" role="alert">
                          {error}
                        </div>
                      )}
                      <FormLogin />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        
        // Define o layout para esta página
        Login.getLayout = function getLayout(page: React.ReactNode) {
          return <NoLayout>{page}</NoLayout>;
        };
        
        export const getServerSideProps = async (context: any) => {
          return usuario_guest(context);
        };
        