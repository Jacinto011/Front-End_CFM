import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useUserContext } from "@/context/UserContext";
import { decodeToken } from "@/utils/jwt";

// Validação com Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Endereço de e-mail inválido").required("O e-mail é obrigatório"),
  password: Yup.string().required("A senha é obrigatória"),
});

const FormLogin = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      setLoading(false);

      if (response.ok) {
        const responseData = await response.json();

        if (responseData.access_token) {
          // Salva o token nos cookies
          document.cookie = `token=${responseData.access_token}; Path=/; Secure; HttpOnly`;

          // Decodifica o token e atualiza o contexto do usuário
          const userData = decodeToken(responseData.access_token);
          setUser(userData);

          // Redireciona para a página principal após salvar os dados do usuário
          router.push("/");
        } else {
          setMessage("Erro no servidor. Por favor, tente novamente.");
        }
      } else {
        if (response.status === 401) {
          setMessage("Credenciais inválidas. Verifique seu e-mail e senha.");
        } else {
          setMessage("Erro inesperado. Por favor, tente novamente mais tarde.");
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Erro ao realizar login:", error);
      setMessage("Erro ao conectar-se ao servidor. Verifique sua conexão.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input className="form-control form-control-lg" {...register("email")} placeholder="Digite seu e-mail" />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>
      <div className="mb-3">
        <label className="form-label">Senha:</label>
        <input className="form-control form-control-lg" {...register("password")} type="password" placeholder="Digite sua senha" />
        {errors.password && <p className="text-danger">{errors.password.message}</p>}
      </div>
      {message && (
        <div className={`alert mt-3 ${message.includes("sucesso") ? "alert-success" : "alert-danger"}`} role="alert">
          {message}
        </div>
      )}
      <div className="text-center mt-3">
        <button type="submit" className="btn btn-lg btn-primary" disabled={loading}>
          {loading ? "Carregando..." : "Entrar"}
        </button>
      </div>
      <div className="mt-3">
        <Link href="/auth/recuperar-senha">Recuperar senha</Link>
      </div>
      <div className="mt-3">
        <Link href="/cadastro">Criar Conta</Link>
      </div>
    </form>
    
  );
};

export default FormLogin;
