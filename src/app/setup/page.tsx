"use client"

import React from "react";
import { useState } from 'react';
import { useUserContext } from '@/modules/auth/UserContext';
import { Box, Button, Center, FormControl, Heading, Text, Input, Select } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { comfortaa } from '@/common/Style';
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SetUp = () => {
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

  const setupUser = async (query: any) => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/profile/', {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access}`
     },
      body: JSON.stringify({
        umur: query['umur'],
        gender: query['gender'],
        berat_badan: query['beratBadan'],
        tinggi_badan: query['tinggiBadan'],
        tingkat_aktivitas: query['tingkatAktivitas']
      })
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      toast({
        title: `Profile`,
        description: `Berhasil melengkapi profile anda`,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      router.replace("/dashboard")
    } else {
      toast({
        title: `Gagal`,
        description: `Profile Anda gagal diperbarui`,
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
          <form onSubmit={handleSubmit(setupUser)}>
            <Text fontSize={'30px'} className={comfortaa.className} fontWeight={'bold'} mb='15px'>Lengkapi Profile</Text>
            <FormControl>
              <Text mb='5px' mt='10px'>Usia</Text>
              <Input {...register('umur')}
                id='umur'
                name='umur'
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
              <Text mb='5px' mt='10px'>Jenis Kelamin</Text>
              <Select isRequired {...register('gender')}>
                <option value='Laki-laki'>Laki-laki</option>
                <option value='Perempuan'>Perempuan</option>
              </Select>
              <Text mb='5px' mt='10px'>Berat badan</Text>
              <Input {...register('beratBadan')}
                placeholder="(dalam kg)"
                id='beratBadan'
                name='beratBadan'
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
            <Text mb='5px' mt='10px'>Tinggi badan</Text>
              <Input {...register('tinggiBadan')}
                placeholder="(dalam cm)"
                id='tinggiBadan'
                name='tinggiBadan'
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
              <Text mb='5px' mt='10px'>Tingkat Aktivitas</Text>
              <Select isRequired {...register('tingkatAktivitas')}>
                <option value='Level_1'>Sedikit atau tidak ada olahraga</option>
                <option value='Level_2'>Olahraga 1-3 kali dalam seminggu</option>
                <option value='Level_3'>Olahraga 4-5 kali dalam seminggu</option>
                <option value='Level_4'>Olahraga setap hari atau intens 3-4 kali dalam seminggu</option>
                <option value='Level_5'>Olahraga intens 6-7 kali dalam seminggu</option>
                <option value='Level_6'>Olahraga sangat intens setiap hari atau pekerjaan fisik</option>
              </Select>
              <Button colorScheme='orange' type='submit' mt='20px'>Submit</Button>
            </FormControl>
          </form>
        </Box>
      </Center >
    </Box >
  );
};

export default SetUp;