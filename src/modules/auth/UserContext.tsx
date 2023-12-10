"use client"

import ChildrenProps from '@/common/types/ChildrenProps';
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { UserData } from '@/common/types/UserData';
import { authenticatedFetch } from '../../common/types/AuthenticatedFetch';
import { useRouter, usePathname } from 'next/navigation';
import UnauthenticatedComponent from './UnauthenticatedComponent';
import { useToast } from "@chakra-ui/react";

interface UserValidateData {
  user: UserData | undefined;
  access: string;
  refresh: string;
  isAuthenticated: boolean;
  registerUser: (query: any) => Promise<void>;
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
  const toast = useToast();

  const authFetch = authenticatedFetch;

  const update = (query: any) => {
    const access = query['access']
    const refresh = query['refresh']
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setAccess(access);
    setRefresh(refresh);
  };

  const registerUser = async (query: any) => {
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
      toast({
        title: `Register`,
        description: `Berhasil register akun Anda`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      router.replace("/setup")
    } else {
      toast({
        title: `Register`,
        description: `Akun Anda sudah teregister`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
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
      update(data);
      setIsAuthenticated(true);
      await getUser(data['access'])
      router.replace("/");
      toast({
        title: `Login`,
        description: `Berhasil masuk ke akun Anda`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    } else {
      toast({
        title: `Login`,
        description: `Gagal masuk ke akun Anda`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  const getUser = async(query:any) => {
    console.log(access)
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/profile', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${query}`
      },
      
    })
    
    const data = await response.json();
    if (response.status == 200){
      setUser(data)
    }
  }

  const refreshAccessToken = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/authentication/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh: query,
      })
    })

    const data = await response.json();
    if (response.status == 200) {
      update(data);
      setIsAuthenticated(true);
      await getUser(data['access'])
    }
    else {
      localStorage.clear()
    }
    setIsLoading(false);
  }

  

  useEffect(() => {
    if (!initialized.current) {
      setIsLoading(true);
      initialized.current = true;
      const refresh = localStorage.getItem('refresh') ?? '';
      if (refresh) {
        refreshAccessToken(refresh);
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <main>

      </main>
    )
  } else if (!isAuthenticated && (pathname != '/login' && pathname != '/register')) {
    console.log('aaa');
    return (
      <main>
        <UnauthenticatedComponent />
      </main>
    )
  }

  return (
    <UserContext.Provider
      value={{
        user, access, refresh, isAuthenticated, registerUser, login, authFetch
      }}
    >
      {children}
    </UserContext.Provider>
  );
};