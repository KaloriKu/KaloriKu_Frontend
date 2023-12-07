import { Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, IconButton, FormControl, Input, Text, useToast, Heading, Grid, NumberInput } from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { useUserContext } from '../auth/UserContext';
import { comfortaa } from '@/common/Style';
import { useDaftarMakananContext } from './DaftarMakananContext';

interface AddMakananModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMakananModal: React.FC<AddMakananModalProps> = ({ isOpen, onClose }) => {
  const { handleSubmit, register } = useForm();
  const [isHover, setIsHover] = useState(false);
  const [numberValid, setNumberValid] = useState(true);
  const toast = useToast();
  const { authFetch } = useUserContext();
  const { fetchDaftarMakanan } = useDaftarMakananContext();

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const addMakananSaya = async (query: any) => {
    if (!numberValid) {
      return
    }

    const response = await authFetch(
      process.env.NEXT_PUBLIC_API_URL +
      '/api/v1/makanan/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: new URLSearchParams({
        nama: query['nama'],
        jumlahKalori: query['jumlahKalori'],
        jumlahLemak: query['jumlahLemak'],
        jumlahKarbohidrat: query['jumlahKarbohidrat'],
        jumlahProtein: query['jumlahProtein'],
      })
    }
    );

    const data = await response.json();
    if (response.status == 200) {
      fetchDaftarMakanan();
      toast({
        title: `Makanan Saya`,
        description: data,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    } else {
      toast({
        title: `Makanan Saya`,
        description: data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    }
    onClose();
  }

  const check = (e: any) => {
    const number = e.target.value;
    if (number < 0) {
      setNumberValid(false);
    } else {
      setNumberValid(true);
    }
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        size={'xl'}
        motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent top={'20%'}>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(addMakananSaya)}>
              <FormControl pt='3px'>
                <Heading as='u' fontSize={'26px'} mb='15px' className={comfortaa.className}>Menambah Makanan Saya</Heading>
                <Text mb='5px' mt='10px'>Nama Makanan</Text>
                <Input mb='15px' {...register('nama')}
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
                  onMouseOut={out} />
                <Grid templateColumns='repeat(4, 1fr)' gap='10px'>
                  <Text>Kalori</Text>
                  <Text>Lemak</Text>
                  <Text>Karbohidrat</Text>
                  <Text>Protein</Text>
                  <Input mb='15px' {...register('jumlahKalori')}
                    id='jumlahKalori'
                    name='jumlahKalori'
                    w='100%'
                    focusBorderColor='orange.100'
                    type="number"
                    _hover={{
                      bg: "gray.100",
                      transitionDuration: '0.2s',
                      transitionTimingFunction: "ease-in-out"
                    }}
                    isRequired
                    onMouseOver={over}
                    onMouseOut={out}
                    onChange={check}
                    step={0.01} />
                  <Input mb='15px' {...register('jumlahLemak')}
                    id='jumlahLemak'
                    name='jumlahLemak'
                    w='100%'
                    focusBorderColor='orange.100'
                    type="number"
                    _hover={{
                      bg: "gray.100",
                      transitionDuration: '0.2s',
                      transitionTimingFunction: "ease-in-out"
                    }}
                    isRequired
                    onMouseOver={over}
                    onMouseOut={out}
                    onChange={check}
                    step={0.01} />
                  <Input mb='15px' {...register('jumlahKarbohidrat')}
                    id='jumlahKarbohidrat'
                    name='jumlahKarbohidrat'
                    w='100%'
                    focusBorderColor='orange.100'
                    type="number"
                    _hover={{
                      bg: "gray.100",
                      transitionDuration: '0.2s',
                      transitionTimingFunction: "ease-in-out"
                    }}
                    isRequired
                    onMouseOver={over}
                    onMouseOut={out}
                    onChange={check}
                    step={0.01} />
                  <Input mb='15px' {...register('jumlahProtein')}
                    id='jumlahProtein'
                    name='jumlahProtein'
                    w='100%'
                    focusBorderColor='orange.100'
                    type="number"
                    _hover={{
                      bg: "gray.100",
                      transitionDuration: '0.2s',
                      transitionTimingFunction: "ease-in-out"
                    }}
                    isRequired
                    onMouseOver={over}
                    onMouseOut={out}
                    onChange={check}
                    step={0.01} />
                </Grid>
                {numberValid ? '' : <Text color='red'>Jumlah harus positif</Text>}
                <IconButton
                  colorScheme='green'
                  aria-label='Search'
                  icon={<FaPlus />}
                  type='submit'
                  style={{ "float": "right" }}
                />
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddMakananModal;