"use client"

import React from "react";
import { useState } from 'react';
import { useUserContext } from '@/modules/auth/UserContext';
import { Box, Button, Center, FormControl, Heading, Text, Input, Select, Textarea, IconButton } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { comfortaa } from '@/common/Style';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";

const addArtikel = () => {
  const { handleSubmit, register } = useForm();
  const [isHover, setIsHover] = useState(false);
  const { access } = useUserContext()
  const toast = useToast();
  const router = useRouter();

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const back = () => {
    router.back();
  }

  const addArtikel = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/artikel/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `Bearer ${access}`
     },
     body:  JSON.stringify({
        id: query['id'],
        judulArtikel: query['judulArtikel'],
        isiArtikel: query['isiArtikel'],
        tanggalDiunggah: query['tanggalDiunggah'],
      })
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      toast({
        title: `Berhasil!`,
        description: `Artikel Berhasil Disimpan`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      router.replace("/artikel")
    } else {
      toast({
        title: `Gagal!`,
        description: `Gagal menyimpan artikel`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <Box px={'80px'} pt={'80px'}>
    <IconButton
      aria-label='Back'
      onClick={back}
      icon={<FaAngleLeft />}
    />
      <Center>
        
        <Box w='900px'>
          <form onSubmit={handleSubmit(addArtikel)}>
            <Text fontSize={'30px'} className={comfortaa.className} fontWeight={'bold'} mb='15px'>Tambah Artikel Baru</Text>
            <FormControl>
               <Text mb='5px' mt='10px'>Judul Artikel</Text>
               <Input {...register('judulArtikel')}
                    placeholder="Masukkan judul artikel"
                    id='judulArtikel'
                    name='judulArtikel'
                    w='100%'
                    focusBorderColor='orange.100'
                    _hover={{
                        bg: "gray.100",
                        transitionDuration: '0.2s',
                        transitionTimingFunction: "ease-in-out"
                            }}
                    isRequired
                    onMouseOver={over}
                    onMouseOut={out}>
              </Input>
              <Text mb='5px' mt='10px'>Isi Artikel</Text>
              <Textarea  {...register('isiArtikel')}
                resize="vertical"
                h="200px"
                placeholder="Masukkan isi artikel"
                id='isiArtikel'
                name='isiArtikel'
                w='100%'
                focusBorderColor='orange.100'
                _hover={{
                  bg: "gray.100",
                  transitionDuration: '0.2s',
                  transitionTimingFunction: "ease-in-out"
                }}
                isRequired
                onMouseOver={over}
                onMouseOut={out}>
                </Textarea>
              <Button colorScheme='orange' type='submit' mt='20px'>Submit</Button>
            </FormControl>
          </form>
        </Box>
      </Center >
    </Box >
  );
};

export default addArtikel;