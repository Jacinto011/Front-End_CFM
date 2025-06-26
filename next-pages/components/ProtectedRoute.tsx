import React from 'react';
import { useRoleValidator } from '../hooks/useRoleValidator';
import { RoleType } from '../src/utils/roleUtils';

interface ProtectedRouteProps {
  rolesAllowed?: RoleType[];
  userRole?: string [] | null;
  children: React.ReactNode;
}

export default function ProtectedRoute({ rolesAllowed = [], children }: ProtectedRouteProps) {
  const hasAccess = useRoleValidator(rolesAllowed);

  if (!hasAccess) {
    // Enquanto checa autorização
    return <p>Verificando acesso...</p>;
  }

  // Quando autorizado, renderiza os filhos
  return <>{children}</>;
}
