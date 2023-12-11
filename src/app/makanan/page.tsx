"use client"

import { Center, CircularProgress, Heading, useToast, Button, SimpleGrid, Box, Flex, Spacer, IconButton, useDisclosure, Text, Grid } from '@chakra-ui/react';
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
  const toast = useToast();
  const { authFetch } = useUserContext();
  const [selectedMakananIds, setSelectedMakananIds] = useState<number[]>([]);
  const [totalKalori, setTotalKalori] = useState(0);

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedMakananIds((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedMakananIds((prevSelected) => prevSelected.filter((mId) => mId !== id));
    }

    var selectedMakanan = allMakanan.find((makanan) => makanan.id === id);
    if (!selectedMakanan){
      selectedMakanan = allMakananSaya.find((makanan) => makanan.id === id);
    }
    if (selectedMakanan) {
      const kaloriChange = isChecked ? selectedMakanan.jumlahKalori : -selectedMakanan.jumlahKalori;
      setTotalKalori((prevTotal) => prevTotal + kaloriChange);
    }
  };

  const addMakananDikonsumsi = async () => {
    if (selectedMakananIds.length === 0) {
      toast({
        title: 'Error',
        description: 'Silakan pilih terlebih dahulu makanan yang ingin ditambahkan.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }
    
    const response = await authFetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/makanan-dikonsumsi/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: JSON.stringify({
        makanan: selectedMakananIds,
      }),
    }
    );
    
    if (response.status === 200) {
      toast({
        title: `Makanan Dikonsumsi`,
        description: "Berhasil tersimpan",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      router.push('./dashboard')
    } else {
      toast({
        title: `Makanan Dikonsumsi`,
        description: "Gagal menyimpan",
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }
  
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
              <MakananBox key={makanan.nama} makanan={makanan} onCheckboxChange={handleCheckboxChange}/>
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
            <MakananBox key={makanan.nama} makanan={makanan} onCheckboxChange={handleCheckboxChange}/>
          ))}
        </SimpleGrid>
      </Box>
      <Box
        position="fixed"
        bottom="0"
        left="0"
        width="100%"
        bgColor="#f8f8f8"
        p="4"
        height='75px'
        shadow={'0px -2px 20px -7px rgba(0, 0, 0, 0.3)'}
      >      
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="18px" fontWeight="bold" pb="5px" pt="5px" pl="15px">
          Total Kalori: {totalKalori}g
        </Text>
        <Button
          onClick={addMakananDikonsumsi}
          colorScheme="orange"
          size="md"
          width="100px"
          mr="30px"
        >
          Simpan
        </Button>
      </Flex>
      </Box>
      </>
  );
};

export default Makanan;