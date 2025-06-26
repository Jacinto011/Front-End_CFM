export const ROLES = {
  ESTAGIARIO: 'estagiario',
  SUPERVISOR: 'supervisor',
  ADMIN: 'admin',
} as const;

export type RoleType = typeof ROLES[keyof typeof ROLES];

// Normaliza os papéis (roles) do usuário recebendo os dados dele
export const normalizeRoles = (userData: any): string[] => {
  if (!userData) return [];

  if (userData.userRoles) {
    return userData.userRoles.filter(Boolean);
  }

  if (Array.isArray(userData.roles)) {
    return userData.roles;
  }

  if (typeof userData.roles === 'string') {
    return [userData.roles];
  }

  return [];
};

// Retorna o papel principal do usuário (em minúsculas)
export const getPrimaryRole = (userData: any): string | null => {
  const roles = normalizeRoles(userData);
  return roles[0]?.toLowerCase() || null;
};
