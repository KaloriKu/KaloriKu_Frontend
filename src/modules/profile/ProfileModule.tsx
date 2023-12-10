'use client';
import { comfortaa } from "@/common/Style";
import { useUserContext } from "@/modules/auth/UserContext";
import { Box, Image, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import { Icon } from '@chakra-ui/react'
import { FaDumbbell } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { useEffect, useRef, useState } from "react";
import { FaGenderless } from "react-icons/fa";
import { BsGenderMale } from "react-icons/bs";
import { TbGenderFemme } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import { CiRuler } from "react-icons/ci";
import { Input } from '@chakra-ui/react';
import { NumberInput } from '@chakra-ui/react';
import {
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

export default function ProfileModule() {
    const { user, authFetch } = useUserContext()
    const [foto, setFoto] = useState<string | undefined>()
    const [umur, setUmur] = useState(user?.umur)
    const [gender, setGender] = useState(user?.gender as string)
    const [berat, setBerat] = useState(user?.berat_badan)
    const [tinggi, setTinggi] = useState(user?.tinggi_badan)
    const [isPressed, setIsPressed] = useState(false)
    const [padding, setPadding] = useState('0%')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (user?.gender === 'Laki-laki') {
            setFoto('https://freepngimg.com/save/22654-man/594x600')

        }
        else if (user?.gender === 'Perempuan') {
            setFoto('https://static.vecteezy.com/system/resources/previews/008/472/913/original/portrait-of-beautiful-young-asian-woman-file-png.png')
        }

        const handleResize = () => {
            if (window.innerWidth > 1300) {
                setPadding('20%')
            } else {
                setPadding('2%')
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const editProfile = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 500));
        await authFetch(process.env.NEXT_PUBLIC_API_URL +
            '/api/v1/profile/',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    umur: umur,
                    gender: gender,
                    berat_badan: berat,
                    tinggi_badan: tinggi
                })
            }
        )
        setIsLoading(false)
        window.location.reload()
    }


    return (
        <>
            <Box pt='5%' px={padding}>
                <Flex direction='row'>
                    <Box w='30%'>
                        <Flex direction='column'>
                            <Center>
                                <Image
                                    boxSize='100%'
                                    src={foto}
                                    fallbackSrc='data:image/png;base64,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'
                                />
                            </Center>
                            <Text fontSize={'30px'} className={comfortaa.className} pt={'20px'} fontWeight={'bold'}>
                                {user?.nama}
                            </Text>

                            {(() => {
                                if (!isPressed) {
                                    return (
                                        <>
                                            <Flex>
                                                <Box w='10%'>
                                                    <Icon as={TfiEmail} />
                                                </Box>
                                                <Box w='80%' mx={'5px'}>
                                                    <Text fontSize={'15px'} className={comfortaa.className} pt={'5px'}>
                                                        {user?.user.email}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Flex>
                                                <Box w='10%'>
                                                    <Icon as={FaCalendarAlt} />
                                                </Box>
                                                <Box w='80%' mx={'5px'}>
                                                    <Text fontSize={'15px'} className={comfortaa.className} pt={'5px'}>
                                                        {user?.umur !== null ? user?.umur : '-'}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Flex>

                                                <Box w='10%'>
                                                    {(() => {
                                                        if (user?.gender === null) return <Icon as={FaGenderless} />
                                                        else if (user?.gender === 'Laki-laki') return <Icon as={BsGenderMale} />
                                                        else return <Icon as={TbGenderFemme} />
                                                    })()}
                                                </Box>
                                                <Box w='80%' mx={'5px'}>
                                                    <Text fontSize={'15px'} className={comfortaa.className} pt={'5px'}>
                                                        {user?.gender !== null ? user?.gender : '-'}
                                                    </Text>
                                                </Box>
                                            </Flex>

                                            <Flex>
                                                <Box w='10%'>
                                                    <Icon as={FaDumbbell} />
                                                </Box>
                                                <Box w='80%' mx={'5px'}>
                                                    <Text fontSize={'15px'} className={comfortaa.className} pt={'5px'}>
                                                        {user?.berat_badan !== null ? user?.berat_badan + " kg" : '-'}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Flex>
                                                <Box w='10%'>
                                                    <Icon as={CiRuler} />
                                                </Box>
                                                <Box w='80%' mx={'5px'}>
                                                    <Text fontSize={'15px'} className={comfortaa.className} pt={'5px'}>
                                                        {user?.tinggi_badan !== null ? user?.tinggi_badan + " cm" : '-'}
                                                    </Text>
                                                </Box>
                                            </Flex>
                                            <Button colorScheme='orange' mt={'100px'} onClick={() => { setIsPressed(!isPressed) }}>Edit Profile</Button>
                                        </>
                                    )
                                }
                                else {
                                    return (
                                        <>
                                            <Flex direction={'column'} gap={'5px'}>
                                                <InputGroup>
                                                    <InputLeftAddon children={(() => {
                                                        return <Icon as={FaCalendarAlt} />
                                                    })()} />
                                                    <NumberInput step={1} defaultValue={user?.umur} onChange={(e) => { setUmur(parseInt(e)) }} style={{ width: '100%' }}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </InputGroup>
                                                <InputGroup>
                                                    <InputLeftAddon children={(() => {
                                                        if (user?.gender === null) return <Icon as={FaGenderless} />
                                                        else if (user?.gender === 'Laki-laki') return <Icon as={BsGenderMale} />
                                                        else return <Icon as={TbGenderFemme} />
                                                    })()} />
                                                    <Select defaultValue={user?.gender as string} onChange={(e) => { setGender(e.target.value) }} style={{ width: '100%' }}>
                                                        <option value='Laki-laki'>Laki-laki</option>
                                                        <option value='Perempuan'>Perempuan</option>
                                                    </Select>
                                                </InputGroup>
                                                <InputGroup>
                                                    <InputLeftAddon children={(() => {
                                                        return <Icon as={FaDumbbell} />
                                                    })()} />
                                                    <NumberInput step={1} defaultValue={user?.berat_badan} onChange={(e) => { setBerat(parseInt(e)) }} style={{ width: '100%' }}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </InputGroup>
                                                <InputGroup>
                                                    <InputLeftAddon children={(() => {
                                                        return <Icon as={CiRuler} />
                                                    })()} />
                                                    <NumberInput step={1} defaultValue={user?.tinggi_badan} onChange={(e) => { setTinggi(parseInt(e)) }} style={{ width: '100%' }}>
                                                        <NumberInputField />
                                                        <NumberInputStepper>
                                                            <NumberIncrementStepper />
                                                            <NumberDecrementStepper />
                                                        </NumberInputStepper>
                                                    </NumberInput>
                                                </InputGroup>
                                                <Button colorScheme='gray' mt={'100px'} onClick={() => setIsPressed(!isPressed)} style={{ width: '100%' }}>Cancel</Button>
                                                <Button colorScheme='orange' mt={'5px'} onClick={editProfile} isLoading={isLoading} style={{ width: '100%' }}>Submit</Button>
                                            </Flex>
                                        </>
                                    )
                                }
                            })()}
                        </Flex>
                    </Box>
                    <Box w='70%' px={'5%'}>

                        <Flex direction={'column'}>
                            <Text fontSize={'13px'} className={comfortaa.className} pt={'5px'}>
                                Account
                            </Text>
                            <Button colorScheme='gray' mt={'5px'} style={{ width: '100%' }}>
                                <Text fontSize={'15px'} className={comfortaa.className} pt={'5px'}>
                                    Change your account information
                                </Text>
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}