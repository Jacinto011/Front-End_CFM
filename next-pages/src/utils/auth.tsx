import Cookies from 'js-cookie';
import { UserData } from '../contexts/UserContext';

export const isAuthenticated = () => {
  return !!Cookies.get('token');
};

export const hasRequiredRole = (requiredRole: string | undefined) => {
  const userRole = Cookies.get('userRole');
  return userRole === requiredRole;
};

export const getUserRoles = (): string[] => {
  const userDataStr = localStorage.getItem('userData');
  if (!userDataStr) return [];

  try {
    const userData: UserData = JSON.parse(userDataStr);
    return userData.roles || [];
  } catch (e) {
    console.error('Erro ao fazer parse do userData:', e);
    return [];
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  window.location.href = '/login';
};