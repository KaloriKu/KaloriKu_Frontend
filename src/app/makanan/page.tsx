"use client"

import { Center, CircularProgress, Heading, SimpleGrid, Box, Flex, Spacer, IconButton, useDisclosure, Text } from '@chakra-ui/react';
import { useUserContext } from "@/modules/auth/UserContext";
import { useDaftarMakananContext } from '@/modules/makanan/DaftarMakananContext';
import { useEffect, useRef, useState } from 'react';
import MakananBox from '@/modules/makanan/MakananBox';
import { FaPlus, FaAngleLeft } from "react-icons/fa6";
import AddMakananSayaModal from '@/modules/makanan/AddMakananSayaModal';
import { comfortaa } from '@/common/Style';
import { useRouter } from 'next/navigation';

const Makanan = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState(300);
  const [itemsAmount, setItemsAmount] = useState(32);
  const { isAuthenticated } = useUserContext();
  const { allMakanan, allMakananSaya, isLoading, fetchDaftarMakanan } = useDaftarMakananContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialized = useRef(false);
  const router = useRouter();

  const handleScroll = () => {
    if (window.scrollY >= clientWindowHeight) {
      setClientWindowHeight(window.scrollY)
      setItemsAmount(itemsAmount + 12);
    }
  };

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
      fetchDaftarMakanan();
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
        <Flex pt={'20px'}>
          <Text fontSize={'26px'} className={comfortaa.className} fontWeight={'bold'}>
            Makanan Saya
          </Text>
          <Spacer />
          <IconButton
            colorScheme='green'
            aria-label='Add Makanan Saya'
            onClick={onOpen}
            icon={<FaPlus />}
          />
        </Flex>
        <AddMakananSayaModal
          isOpen={isOpen}
          onClose={onClose} />
        {allMakananSaya.length == 0 ?
          <Center><Text py='10px'>{'Belum ada makanan kamu yang disimpan'}</Text></Center> :
          <SimpleGrid
            gap={'30px'}
            minChildWidth='250px'
            pb={'20px'}
            pt={'20px'}>
            {allMakananSaya.map((makanan) => (
              <MakananBox key={makanan.nama} makanan={makanan} />
            ))}
          </SimpleGrid>
        }
        <Text fontSize={'26px'} className={comfortaa.className} pt={'20px'} fontWeight={'bold'}>
          Semua Makanan
        </Text>
        <SimpleGrid
            gap={'30px'}
            minChildWidth='250px'
            pb={'20px'}
            pt={'20px'}>
          {allMakanan.slice(0, itemsAmount).map((makanan) => (
            <MakananBox key={makanan.nama} makanan={makanan} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default Makanan;