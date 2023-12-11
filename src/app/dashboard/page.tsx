"use client"

import { Button, Center, CircularProgress, Heading, SimpleGrid, Box, Flex, Spacer, IconButton, useDisclosure, Text, Grid } from '@chakra-ui/react';
import { useUserContext } from "@/modules/auth/UserContext";
import { useEffect, useRef, useState } from 'react';
import { comfortaa } from '@/common/Style';
import { useRouter } from 'next/navigation';
import { useTargetContext } from '@/modules/target/TargetContext';
import { useDaftarMakananDikonsumsiContext } from '@/modules/makanan_dikonsumsi/DaftarMakananDikonsumsiContext';
import MakananDikonsumsiBox from '@/modules/makanan_dikonsumsi/MakananDikonsumsiBox';


const Makanan = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState(300);
  const [itemsAmount, setItemsAmount] = useState(32);
  const { isAuthenticated } = useUserContext();
  const { target, isLoading, fetchTarget } = useTargetContext();
  const { allMakananDikonsumsi, fetchDaftarMakananDikonsumsi } = useDaftarMakananDikonsumsiContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialized = useRef(false);
  const router = useRouter();
  const { user, access } = useUserContext()

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
      fetchTarget();
      fetchDaftarMakananDikonsumsi();
    }
  }, []);

  const editTarget = () => {
    router.push('/dashboard/edit')
}

  const addMakananDikonsumsi = () => {
    router.push('./makanan')
  }

  if (isLoading)
    return (
      <Center>
        <CircularProgress color={'white'} isIndeterminate />
      </Center>
    );

  return (
    <>
      <Box px={'80px'} pt={'80px'}>
        <Text fontSize={'30px'} className={comfortaa.className} pt={'20px'} fontWeight={'bold'}>
            Hai, {user?.nama}!
        </Text>
        {target == undefined ?
          <Text fontSize={'30px'} className={comfortaa.className} pt={'20px'} >{'Target kamu belum tersimpan'}</Text> :
          <>
          <Text fontSize={'30px'} className={comfortaa.className} pt={'20px'}>
            Target harian kamu adalah {Math.ceil(target.targetKaloriHarian)} kalori
          </Text>
          {
            target.tujuan == "Menjaga berat badan" ?
            <Text fontSize={'20px'} className={comfortaa.className} pt={'20px'}>
            Dengan tujuan {target.tujuan.toLowerCase()} selama {target.jangkaWaktu} minggu
            </Text>:
            <Text fontSize={'20px'} className={comfortaa.className} pt={'20px'}>
                Dengan tujuan {target.tujuan.toLowerCase()} sebanyak {target.perubahanBeratBadan} kg dalam jangka waktu {target.jangkaWaktu} minggu
            </Text>
          }
          </>
        }

        <Button colorScheme='orange' mt={'50px'} onClick={editTarget}>Atur Target</Button>


      </Box>
      <Box px={'80px'} pt={'80px'}>
        <Text fontSize={'26px'} className={comfortaa.className} pt={'20px'} fontWeight={'bold'} mb='0'>
          Riwayat Makanan Dikonsumsi
        </Text>
        <Button colorScheme='orange' mt='5px' mb='10px' onClick={addMakananDikonsumsi}>Tambah Makanan Dikonsumsi</Button>
        <Grid
            gap={'30px'}
            pb={'20px'}
            pt={'20px'}
            alignItems='center'
            justifyItems='center'>
          {allMakananDikonsumsi.length == 0 ?
          <Center><Text py='10px'>{'Daftar makanan dikonsumsi masih kosong.'}</Text></Center> :
          allMakananDikonsumsi.slice(0, itemsAmount).map((makananDikonsumsi) => (
            <MakananDikonsumsiBox key={makananDikonsumsi.timeStamp} makananDikonsumsi={makananDikonsumsi} />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Makanan;