'use client'

import ChildrenProps from '@/common/types/ChildrenProps';
import { MakananDikonsumsiData } from '@/common/types/MakananDikonsumsiData';
import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from 'react';
import { useUserContext } from '../auth/UserContext';

interface DaftarMakananDikonsumsiData {
  allMakananDikonsumsi: MakananDikonsumsiData[];
  fetchDaftarMakananDikonsumsi: () => Promise<void>;
}

export const DaftarMakananDikonsumsiContext = createContext<DaftarMakananDikonsumsiData>(
  {} as DaftarMakananDikonsumsiData
);

export const useDaftarMakananDikonsumsiContext = () => useContext(DaftarMakananDikonsumsiContext);

export const DaftarMakananDikonsumsiContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const [allMakananDikonsumsi, setAllMakananDikonsumsi] = useState<MakananDikonsumsiData[]>([]);
  const { authFetch } = useUserContext();
  const toast = useToast();

  const fetchDaftarMakananDikonsumsi = async () => {
    const response = await authFetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/makanan-dikonsumsi/all', {
      method: 'GET',
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      setAllMakananDikonsumsi(data.data);
    } else {
      toast({
        title: `Riwayat Daftar Makanan Dikonsumsi`,
        description: `Riwayat Daftar Makanan Dikonsumsi tidak berhasil ditampilkan`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  };

  return (
    <DaftarMakananDikonsumsiContext.Provider
      value={{
        allMakananDikonsumsi, fetchDaftarMakananDikonsumsi
      }}
    >
      {children}
    </DaftarMakananDikonsumsiContext.Provider>
  );
};
