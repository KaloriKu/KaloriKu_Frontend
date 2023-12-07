'use client'

import ChildrenProps from '@/common/types/ChildrenProps';
import { MakananData } from '@/common/types/MakananData';
import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from 'react';
import { useUserContext } from '../auth/UserContext';

interface DaftarMakananData {
  allMakanan: MakananData[];
  allMakananSaya: MakananData[];
  isLoading: boolean;
  fetchDaftarMakanan: () => Promise<void>;
}

export const DaftarMakananContext = createContext<DaftarMakananData>(
  {} as DaftarMakananData
);

export const useDaftarMakananContext = () => useContext(DaftarMakananContext);

export const DaftarMakananContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const [allMakanan, setAllMakanan] = useState<MakananData[]>([]);
  const [allMakananSaya, setAllMakananSaya] = useState<MakananData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { authFetch } = useUserContext();
  const toast = useToast();

  const fetchDaftarMakanan = async () => {
    setLoading(true);
    const response = await authFetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/makanan/all', {
      method: 'GET',
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      setAllMakanan(data.allMakanan);
      setAllMakananSaya(data.allMakananSaya);
    } else {
      toast({
        title: `Daftar Makanan`,
        description: `Makanan tidak berhasil ditampilkan`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
    setLoading(false);
  };

  return (
    <DaftarMakananContext.Provider
      value={{
        allMakanan, allMakananSaya, isLoading, fetchDaftarMakanan
      }}
    >
      {children}
    </DaftarMakananContext.Provider>
  );
};