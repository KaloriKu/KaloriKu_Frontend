"use client"

import { useState } from 'react';
import { useUserContext } from '@/modules/auth/UserContext';
import { Box, Button, Center, FormControl, Heading, Text, Input } from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { comfortaa } from '@/common/Style';

const Register = () => {
  const { handleSubmit, register } = useForm();
  const { registerUser } = useUserContext();
  const [isHover, setIsHover] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passInvalid, setPassInvalid] = useState(false);

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const emailCheck = (e: any) => {
    const email = e.target.value;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
  }

  const handleRegister = async (query: any) => {
    if (emailInvalid || passInvalid) {
      return
    }

    registerUser({
      "email": query['email'],
      "password": query['password'],
      "nama": query['nama']
    })
  };

  return (
    <Box py={'150px'}>
      <Center>
        <Box w='320px'>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Text fontSize={'30px'} className={comfortaa.className} fontWeight={'bold'} mb='15px'>Register akun Anda</Text>
            <FormControl>
              <Text mb='5px' mt='10px'>Nama</Text>
              <Input {...register('nama')}
                id='nama'
                name='nama'
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
                onChange={emailCheck} />
              <Text mb='5px' mt='10px'>Email</Text>
              <Input {...register('email')}
                id='email'
                name='email'
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
                onChange={emailCheck} />
              {emailInvalid
                ? <Text color='red' mt='5px'>Email salah</Text>
                : ""
              }
              <Text mb='5px' mt='10px'>Password</Text>
              <Input {...register('password')}
                id='password'
                name='password'
                w='100%'
                focusBorderColor='orange.100'
                _hover={{
                  bg: "gray.100",
                  transitionDuration: '0.2s',
                  transitionTimingFunction: "ease-in-out"
                }}
                isRequired
                type='password'
                isInvalid={passInvalid}
                onMouseOver={over}
                onMouseOut={out} />
              {passInvalid
                ? <Text color='red' mt='5px'>Password salah</Text>
                : ""
              }
              <Button colorScheme='orange' type='submit' mt='20px'>Register</Button>
            </FormControl>
          </form>
        </Box>
      </Center >
    </Box >
  );
};

export default Register;