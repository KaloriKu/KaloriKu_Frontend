'use client'

import ChildrenProps from '@/common/types/ChildrenProps';
import { ArtikelData } from '@/common/types/ArtikelData';
import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from 'react';
import { useUserContext } from '../auth/UserContext';

interface DaftarArtikelData {
  allArtikel: ArtikelData[];
  artikelById: ArtikelData;
  isLoading: boolean;
  fetchDaftarArtikel: () => Promise<void>;
  fetchArtikelById: (id: any) => Promise<void>;
}


export const DaftarArtikelContext = createContext<DaftarArtikelData>(
  {} as DaftarArtikelData
);

export const useDaftarArtikelContext = () => useContext(DaftarArtikelContext);

export const DaftarArtikelContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const [allArtikel, setAllArtikel] = useState<ArtikelData[]>([]);
  const [artikelById, setArtikelbyId] = useState<ArtikelData>(null!);
  const [isLoading, setLoading] = useState(true);
  const { authFetch } = useUserContext();
  const toast = useToast();

  const fetchDaftarArtikel = async () => {
    setLoading(true);
    const response = await authFetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/artikel/all', {
      method: 'GET',
    }
    
    );

    const data = await response.json();
    
    if (response.status == 200) {
      setAllArtikel(data.allArtikel);
    } else {
      toast({
        title: `Gagal Menampilkan Artikel`,
        description: `Gagal Menampilkan Artikel`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
    setLoading(false);
  };
  

  const fetchArtikelById = async (id:any) =>{
    setLoading(true)
    const response = await authFetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/artikel/${id}`, {
      method: 'GET',
    }
    );
    const data = await response.json();
    
    if (response.status == 200) {
      setArtikelbyId(data[0]);
    } else {
      toast({
        title: `Daftar Artikel`,
        description: `Gagal Menampilkan Artikel`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
    setLoading(false);

  }

  return (
    <DaftarArtikelContext.Provider
      value={{
        allArtikel, isLoading, artikelById,fetchDaftarArtikel, fetchArtikelById
          
      }}
    >
      {children}
    </DaftarArtikelContext.Provider>
  );
};