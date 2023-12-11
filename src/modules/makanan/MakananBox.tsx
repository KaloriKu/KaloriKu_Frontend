import { Color } from "@/common/Style";
import { MakananData } from "@/common/types/MakananData";
import { Card, Stack, Heading, Text, Grid, Checkbox, Flex } from "@chakra-ui/react";
import { useState } from 'react';

interface MakananBoxProps {
  makanan: MakananData;
  onCheckboxChange: (id: number, isChecked: boolean) => void;
}

const MakananBox: React.FC<MakananBoxProps> = ({ makanan, onCheckboxChange }) => {
  const [_, setIsHover] = useState(false);

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onCheckboxChange(makanan.id, newCheckedState);
  };

  const over = () => {
    setIsHover(true);
  }
  const out = () => {
    setIsHover(false);
  }

  const makananClick = () => {
    toggleCheckbox();
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
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize='18px' noOfLines={2} size='md' pb='5px'>{makanan.nama}</Heading>
            <Checkbox isChecked={isChecked} onChange={toggleCheckbox} colorScheme={'orange'}></Checkbox>
          </Flex>
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