"use client"

import ChildrenProps from '@/common/types/ChildrenProps';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { UserData } from '@/common/types/UserData';
import { authenticatedFetch } from '../../common/types/AuthenticatedFetch';
import { useRouter, usePathname } from 'next/navigation';
import UnauthenticatedComponent from './UnauthenticatedComponent';

interface UserValidateData {
  user: UserData | undefined;
  access: string;
  refresh: string;
  isAuthenticated: boolean;
  register: (query: any) => Promise<void>;
  login: (query: any) => Promise<void>;
  authFetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
}

export const UserContext = createContext<UserValidateData>(
  {} as UserValidateData
);

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const initialized = useRef(false);
  const [user, setUser] = useState<UserData>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [access, setAccess] = useState('');
  const [refresh, setRefresh] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  const authFetch = authenticatedFetch;

  const update = (query: any) => {
    const access = query['access']
    const refresh = query['refresh']
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setAccess(access);
    setRefresh(refresh);
  };

  const register = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/authentication/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: query['email'],
        password: query['password'],
        nama: query['nama'],
      })
    }
    );

    const data = await response.json();
    if (response.status == 201) {
      setUser(data);
      login({
        "username": query['email'],
        "password": query['password']
      })
    } else {

    }
  }

  const login = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/authentication/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: query['username'],
        password: query['password'],
      })
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      console.log(data);
      update(data);
      setIsAuthenticated(true);
      router.replace("/");
    } else {

    }
  }

  const refreshAccessToken = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/authentication/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh: localStorage.getItem('refresh'),
      })
    })

    const data = await response.json();
    if (response.status == 200){
      console.log(data);
      update(data);
      setIsAuthenticated(true);
    }
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const refresh = localStorage.getItem('refresh') ?? '';
      if (refresh){
        refreshAccessToken()
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <main>

      </main>
    )
  }

  if (!isAuthenticated && (pathname != '/login' && pathname != '/register')) {
    return (
      <main>
        <UnauthenticatedComponent />
      </main>
    )
  }

  return (
    <UserContext.Provider
      value={{
        user, access, refresh, isAuthenticated, register, login, authFetch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};