import { comfortaa } from '@/common/Style';
import { Color } from '@/common/Style';
import { Text, Flex } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <>
      <Flex
        px={6}
        py={3}
        align={'center'}
        zIndex="2000"
        as="header"
        position="fixed"
        w="100%"
        backgroundColor={Color.ONE}
        shadow={'0px 10px 20px -12px rgba(255,151,71,1)'}>
        <Text className={comfortaa.className} as='b' color={'white'} fontSize={'24px'}>KaloriKu</Text>
      </Flex>
    </>
  )
}

export default Navbar;