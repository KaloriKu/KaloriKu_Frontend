"use client"

import React from "react";
import { useState } from 'react';
import { useUserContext } from '@/modules/auth/UserContext';
import { Box, Button, Center, FormControl, Heading, Text, Input, Select } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { comfortaa } from '@/common/Style';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const EditTarget = () => {
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

  const editTarget = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/target/edit', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `Bearer ${access}`
     },
     body: new URLSearchParams({
        tujuan: query['tujuan'],
        jangkaWaktu: query['jangkaWaktu'],
        perubahanBeratBadan: query['perubahanBeratBadan'],
      })
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      toast({
        title: `Berhasil!`,
        description: `Target Anda berhasil diperbarui`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      router.replace("/dashboard")
    } else {
      toast({
        title: `Gagal!`,
        description: `Target Anda gagal diperbarui`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
  }

  return (
    <Box py={'150px'}>
      <Center>
        <Box w='320px'>
          <form onSubmit={handleSubmit(editTarget)}>
            <Text fontSize={'30px'} className={comfortaa.className} fontWeight={'bold'} mb='15px'>Atur Target</Text>
            <FormControl>
               <Text mb='5px' mt='10px'>Tujuan</Text>
               <Select isRequired {...register('tujuan')}>
                <option value='Menjaga berat badan'>Menjaga berat badan</option>
                <option value='Menaikkan berat badan'>Menaikkan berat badan</option>
                <option value='Menurunkan berat badan'>Menurunkan berat badan</option>
              </Select>
              <Text mb='5px' mt='10px'>Perubahan berat badan</Text>
              <Input {...register('perubahanBeratBadan')}
                placeholder="(dalam kg)"
                id='perubahanBeratBadan'
                name='perubahanBeratBadan'
                w='100%'
                focusBorderColor='orange.100'
                _hover={{
                  bg: "gray.100",
                  transitionDuration: '0.2s',
                  transitionTimingFunction: "ease-in-out"
                }}
                isRequired
                onMouseOver={over}
                onMouseOut={out}
                type="number"
                />
              <Text mb='5px' mt='10px'>Jangka Waktu</Text>
              <Input {...register('jangkaWaktu')}
                placeholder="(dalam minggu)"
                id='jangkaWaktu'
                name='jangkaWaktu'
                w='100%'
                focusBorderColor='orange.100'
                _hover={{
                  bg: "gray.100",
                  transitionDuration: '0.2s',
                  transitionTimingFunction: "ease-in-out"
                }}
                isRequired
                onMouseOver={over}
                onMouseOut={out}
                type="number"
                />
              <Button colorScheme='orange' type='submit' mt='20px'>Submit</Button>
            </FormControl>
          </form>
        </Box>
      </Center >
    </Box >
  );
};

export default EditTarget;