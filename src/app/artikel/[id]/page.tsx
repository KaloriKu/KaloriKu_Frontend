"use client"
import { Center, CircularProgress, Heading, SimpleGrid, Box, Flex, Spacer, IconButton, useDisclosure, Text, useToast } from '@chakra-ui/react';
import { useUserContext } from "@/modules/auth/UserContext";
import { useDaftarArtikelContext } from '@/modules/artikel/DaftarArtikelContext';
import { Key, useEffect, useRef, useState } from 'react';
import { FaPlus, FaAngleLeft } from "react-icons/fa6";
import { comfortaa } from '@/common/Style';
import { useRouter,useParams } from 'next/navigation';

const ArtikelDetailPage = () => {
    const params = useParams()
    console.log(params.id)
    const [clientWindowHeight, setClientWindowHeight] = useState(300);
    const [itemsAmount, setItemsAmount] = useState(32);
    const { isAuthenticated } = useUserContext();
    const { artikelById, isLoading, fetchArtikelById } = useDaftarArtikelContext();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialized = useRef(false);
    const router = useRouter();
    const toast = useToast();

    const back = () => {
      router.back();
    }
    useEffect(() => {
        if (!initialized.current && isAuthenticated) {
            initialized.current = true;
            fetchArtikelById(params.id);
        }
        }, []);
    console.log(artikelById)

    if (isLoading)
    return (
      <Center>
        <CircularProgress color={'white'} isIndeterminate />
      </Center>
    );

    if (artikelById===null){
    return(
      toast({
        title: `Gagal Menampilkan Artikel`,
        description: `Gagal Menampilkan Artikel`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      }))
    
    }
    const tanggalString = new Date(artikelById.tanggalDiunggah.trim()); // Sesuaikan dengan struktur data API
    const tahun = tanggalString.getFullYear();
    const bulan = String(tanggalString.getMonth() + 1).padStart(2, '0');
    const tanggal = String(tanggalString.getDate()).padStart(2, '0');
  
    const tanggalFormatted = `${tanggal}-${bulan}-${tahun}`;
    console.log(tanggalFormatted);
    
    return (
<>    
      <Box px={'80px'} pt={'80px'}>
      <IconButton
          aria-label='Back'
          onClick={back}
          icon={<FaAngleLeft />}
        />
        <Flex pt={'20px'}>
          <Text fontSize={'40px'} className={comfortaa.className} fontWeight={'bold'}>
            {artikelById.judulArtikel}
          </Text>
          <Spacer/> 
        </Flex>
        <Text fontSize={'13px'} className={comfortaa.className} pt={'20px'}>
            Diunggah pada {tanggalFormatted}
          </Text> 
        <Text fontSize={'17px'} className={comfortaa.className} pt={'50px'} >
          {artikelById.isiArtikel}
        </Text>
        
      </Box>
    </>
    );
    };

export default ArtikelDetailPage;