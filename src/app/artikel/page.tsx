"use client"
// import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";

import { Center, CircularProgress, Heading, SimpleGrid, Box, Flex, Spacer, IconButton, useDisclosure, Text } from '@chakra-ui/react';
import { useUserContext } from "@/modules/auth/UserContext";
import { useDaftarArtikelContext } from '@/modules/artikel/DaftarArtikelContext';
import { Key, useEffect, useRef, useState } from 'react';
import { FaPlus, FaAngleLeft } from "react-icons/fa6";
import { useRouter } from 'next/navigation';
import ArtikelCard from '@/modules/artikel/ArtikelCard';

const Artikel = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState(300);
  const [itemsAmount, setItemsAmount] = useState(32);
  const { isAuthenticated,user } = useUserContext();
  const { allArtikel, isLoading, fetchDaftarArtikel } = useDaftarArtikelContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialized = useRef(false);
  const router = useRouter();
  

  const handleScroll = () => {
    if (window.scrollY >= clientWindowHeight) {
      setClientWindowHeight(window.scrollY)
      setItemsAmount(itemsAmount + 12);
    }
  };
  const addArtikel = () => {
    router.push('/artikel/add')
}
  const back = () => {
    router.back();
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (!initialized.current && isAuthenticated) {
      initialized.current = true;
      fetchDaftarArtikel();
    }
  }, []);

  if (isLoading)
    return (
      <Center>
        <CircularProgress color={'white'} isIndeterminate />
      </Center>
    );

  return (
    <>
      <Box px={'80px'} pt={'80px'}>
        <IconButton
          aria-label='Back'
          onClick={back}
          icon={<FaAngleLeft />}
        />
          {(()=>{
              if (user?.role === "Admin") return (
              <Flex pt={'20px'}>
              <Spacer />
              <IconButton
                colorScheme='green'
                aria-label='Add Artikel Saya'
                onClick={addArtikel}
                icon={<FaPlus />}
              />
            </Flex>
                  ) })()}   
        
        <SimpleGrid
            gap={'30px'}
            minChildWidth='500px'
            pb={'20px'}
            pt={'20px'}>
            
          {allArtikel && allArtikel.map((artikel) => (
            <ArtikelCard key={String(artikel.id)} artikel={artikel} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Artikel;

