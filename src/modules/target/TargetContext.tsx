'use client'

import ChildrenProps from '@/common/types/ChildrenProps';
import { TargetData } from '@/common/types/TargetData';
import { useToast } from "@chakra-ui/react";
import { createContext, useContext, useState } from 'react';
import { useUserContext } from '../auth/UserContext';

interface TargetDataUser {
  target: TargetData;
  isLoading: boolean;
  fetchTarget: () => Promise<void>;
}

export const TargetContext = createContext<TargetDataUser>(
  {} as TargetDataUser
);

export const useTargetContext = () => useContext(TargetContext);

export const TargetContextProvider: React.FC<ChildrenProps> = ({
  children
}) => {
  const [target, setTarget] = useState<TargetData>(null!);
  const [isLoading, setLoading] = useState(true);
  const { access } = useUserContext()
  const toast = useToast();

  const fetchTarget = async () => {
    setLoading(true);
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/target', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${access}`
     },
    }
    );

    const data = await response.json();
    if (response.status == 200) {
        try {
            setTarget(data[0].fields);
        }
        catch {
            
        }

    } else {
      toast({
        title: `Data Target`,
        description: `Target tidak berhasil ditampilkan`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
    setLoading(false);
  };

  return (
    <TargetContext.Provider
      value={{
        target, isLoading, fetchTarget
      }}
    >
      {children}
    </TargetContext.Provider>
  );
};