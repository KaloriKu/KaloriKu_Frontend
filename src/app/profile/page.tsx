'use client';
import { comfortaa } from "@/common/Style";
import { useUserContext } from "@/modules/auth/UserContext";
import { Box, Image } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { useRouter } from "next/navigation";
import { Icon } from '@chakra-ui/react'
import { FaDumbbell } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { useEffect, useState } from "react";
import { FaGenderless } from "react-icons/fa";
import { BsGenderMale } from "react-icons/bs";
import { TbGenderFemme } from "react-icons/tb";
import { FaCalendarAlt } from "react-icons/fa";
import { CiRuler } from "react-icons/ci";
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'


export default function Profile() {
    const { user } = useUserContext()
    const [foto, setFoto] = useState<string | undefined>()
    const [ukuran, setUkuran] = useState<string>('0%')
    const [padding, setPadding] = useState('0%')
    const router = useRouter()

    useEffect(() => {
        if (user?.gender === 'Laki-laki') {
            setFoto('https://freepngimg.com/save/22654-man/594x600')

        }
        else if (user?.gender === 'Perempuan') {
            setFoto('https://static.vecteezy.com/system/resources/previews/008/472/913/original/portrait-of-beautiful-young-asian-woman-file-png.png')
        }

        const handleResize = () => {
            // Adjust padding based on screen width
            if (window.innerWidth > 1300) {
                setPadding('20%')
                setUkuran('120px')
            } else {
                setPadding('2%')
                setUkuran('10px')
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const editProfile = () => {
        router.push('/profile/edit')
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
                            <Button colorScheme='orange' mt={'150px'} onClick={editProfile}>Edit Profile</Button>
                        </Flex>
                    </Box>
                    <Box w='70%' px={'5%'}>
                        <Text fontSize={'30px'} className={comfortaa.className} pt={'20px'} fontWeight={'bold'}>
                            {user?.nama}
                        </Text>
                        <CircularProgress value={(parseInt(user!.tingkat_aktivitas))/5*100} color='green.400' size={ukuran}>
                            <CircularProgressLabel>40%</CircularProgressLabel>
                        </CircularProgress>
                    </Box>
                </Flex>
            </Box>
        </>
    )
}