// pages/recuperar-senha.tsx
import React from "react";
import { NoLayout } from "@/layout";
import RecuperarSenhaForm from "@/components/user/RecuperarSenhaForm";

export default function RecuperarSenha() {
  return <RecuperarSenhaForm />;
}

// Define o layout para esta página
RecuperarSenha.getLayout = function getLayout(page: React.ReactNode) {
  return <NoLayout>{page}</NoLayout>;
};
