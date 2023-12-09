import { useRouter } from 'next/navigation';
import { Button, Text, AbsoluteCenter, Flex } from "@chakra-ui/react";
import { Color, comfortaa } from '@/common/Style';

const UnauthenticatedComponent = () => {
  const router = useRouter();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  };

  const titleStyle = {
    fontSize: '2em',
    marginBottom: '20px',
  };

  const buttonContainerStyle = {
    display: 'flex',
  };

  const buttonStyle = {
    marginRight: '10px',
    padding: '10px',
    fontSize: '1em',
    cursor: 'pointer',
  };

  return (
    <>
      <AbsoluteCenter axis='both'>
        <Flex direction={'column'} alignItems='center' justifyContent='center' gap='20px'>
          <Text fontSize={'80px'} className={comfortaa.className} fontWeight={'bold'} color={Color.ONE}>KaloriKu</Text>
          <Button
            variant='outline'
            colorScheme='orange'
            onClick={() => { router.push('/register') }}
            w='70%'>
            Register
          </Button>
          <Button
            colorScheme='orange'
            onClick={() => { router.push('/login') }}
            w='70%'>
            Login
          </Button>
        </Flex>
      </AbsoluteCenter>
    </>)
}

export default UnauthenticatedComponent;