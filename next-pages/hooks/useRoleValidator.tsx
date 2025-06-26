import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserContext } from '../context/UserContext';
import { RoleType } from '../src/utils/roleUtils';

export function useRoleValidator(allowedRoles: RoleType[] = []) {
  const { user, loading } = useUserContext();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  useEffect(() => {
    if (loading) return; // ainda carregando dados do usuário

    if (!user) {
      router.push('/login');
      return;
    }

    const userRoles = user.roles.map(r => r.toLowerCase());
    if (
      allowedRoles.length > 0 &&
      !allowedRoles.some(role => userRoles.includes(role))
    ) {
      router.push('/');
      return;
    }

    setIsAuthorized(true);
  }, [user, loading, router, allowedRoles]);

  return isAuthorized;
}
