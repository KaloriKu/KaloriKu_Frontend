import { Color } from "@/common/Style";
import { MakananData } from "@/common/types/MakananData";
import { Card, Stack, Heading, Text, Grid } from "@chakra-ui/react";
import { useState } from 'react';

interface MakananBoxProps {
  makanan: MakananData
}

const MakananBox: React.FC<MakananBoxProps> = ({ makanan }) => {
  const [_, setIsHover] = useState(false);

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const makananClick = () => {
    // TODO
  }
  return (
    <>
      <Card
        minW='250px'
        _hover={{
          bg: "orange.100",
          transform: 'scale(1.05)',
          transitionDuration: '0.2s',
          transitionTimingFunction: "ease-in-out"
        }}
        onMouseOver={over}
        onMouseOut={out}
        onClick={makananClick}
        cursor='pointer'
        variant={'outline'}
        borderColor={Color.ONE}
        >
        <Stack m='2' spacing='1' p='8px'>
          <Heading fontSize='18px' noOfLines={2} size='md' pb='5px'>{makanan.nama}</Heading>
          <Grid templateColumns='repeat(2, 1fr)'>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {'Kalori'}
          </Text>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {': '+makanan.jumlahKalori+'g'}
          </Text>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {'Lemak'}
          </Text>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {': '+makanan.jumlahLemak+'g'}
          </Text>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {'Karbohidrat'}
          </Text>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {': '+makanan.jumlahKarbohidrat+'g'}
          </Text>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {'Protein'}
          </Text>
          <Text fontSize='sm' isTruncated color='gray.700'>
            {': '+makanan.jumlahProtein+'g'}
          </Text>
          </Grid>
        </Stack>
      </Card>
    </>
  )
}

export default MakananBox;