import { Color } from "@/common/Style";
import { MakananDikonsumsiData } from "@/common/types/MakananDikonsumsiData";
import {
  Card,
  Stack,
  Heading,
  Text,
  Grid,
  Collapse,
  Button,
  useDisclosure,
  Highlight,
  Divider,

} from "@chakra-ui/react";
import React, { useState } from "react";

interface MakananDikonsumsiBoxProps {
  makananDikonsumsi: MakananDikonsumsiData;
}

const MakananDikonsumsiBox: React.FC<MakananDikonsumsiBoxProps> = ({
  makananDikonsumsi,
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const [buttonText, setButtonText] = useState("Show Details");

  const handleToggle = () => {
    onToggle();
    setButtonText((prev) => (prev === "Show Details" ? "Hide Details" : "Show Details"));
  };

  return (
    <>
      <Card minW='250px' width='50vw' variant={'outline'} borderColor={Color.ONE}>
        <Stack m='2' spacing='1' p='8px'>
          <Grid templateColumns='auto 1fr' alignItems='flex-start'>
            <Text
              fontSize='15px'
              noOfLines={2}
              size='md'
              pb='5px'
              gridColumn='1'
            >
              {new Date(makananDikonsumsi.timeStamp).toLocaleDateString('en-GB')}
            </Text>
            <Text
              fontSize='12px'
              noOfLines={2}
              size='md'
              pb='5px'
              gridColumn='2'
              textAlign='right'
            >
              {new Date(makananDikonsumsi.timeStamp).toLocaleTimeString('en-US', {
                hour12: false,
              })}
            </Text>
          </Grid>
          <Grid templateColumns='auto' textAlign='center'>
            <Heading as='h5' fontSize='20px' alignItems='center'>
                Total Kalori
            </Heading>
            <Highlight
              query={makananDikonsumsi.totalKalori.toFixed(2) + 'g'}
              styles={{ px: '1', py: '2', width: 'fit-content', pl: '15px', pr:'15px', mx: 'auto', rounded: 'full', bg: Color.ONE, fg: 'white'}}>
                {makananDikonsumsi.totalKalori.toFixed(2) + 'g'}
            </Highlight>
            <Heading as='h6' fontSize='16px' alignItems='center' mt='4'>
                Total Lemak
            </Heading>
            <Highlight
              query={makananDikonsumsi.totalLemak.toFixed(2) + 'g'}
              styles={{ px: '1', py: '2', width: 'fit-content', pl: '15px', pr:'15px', mx: 'auto', rounded: 'full', bg: Color.TWO, fg: 'white', fontSize:'14px'}}>
                {makananDikonsumsi.totalLemak.toFixed(2) + 'g'}
            </Highlight>
            <Heading as='h6' fontSize='16px' alignItems='center' mt='4'>
                Total Karbohidrat
            </Heading>
            <Highlight
              query={makananDikonsumsi.totalKarbohidrat.toFixed(2) + 'g'}
              styles={{ px: '1', py: '2', width: 'fit-content', pl: '15px', pr:'15px', mx: 'auto', rounded: 'full', bg: Color.TWO, fg: 'white', fontSize:'14px'}}>
                {makananDikonsumsi.totalKarbohidrat.toFixed(2) + 'g'}
            </Highlight>
            <Heading as='h6' fontSize='16px' alignItems='center' mt='4'>
                Total Protein
            </Heading>
            <Highlight
              query={makananDikonsumsi.totalProtein.toFixed(2) + 'g'}
              styles={{ px: '1', py: '2', width: 'fit-content', pl: '15px', pr:'15px', mx: 'auto', rounded: 'full', bg: Color.TWO, fg: 'white', fontSize:'14px'}}>
                {makananDikonsumsi.totalProtein.toFixed(2) + 'g'}
            </Highlight>
          </Grid>
        </Stack>
        <Stack m='2' spacing='1' p='8px' justifyContent='center' alignItems='center'>
        <Button onClick={handleToggle} width='100px' fontSize='sm' variant='link' color={Color.ONE}>
            {buttonText}
        </Button>
        
        </Stack>
        
        <Collapse in={isOpen} animateOpacity>
          {makananDikonsumsi.details.map((detail: { nama: any; jumlahKalori: number; jumlahLemak: number; jumlahKarbohidrat: number; jumlahProtein: number; }, index: any) => (
            <Stack key={index} m='2' spacing='1' p='8px'>
              <Divider />
              <Grid templateColumns='auto 1fr' alignItems='flex-start'>
                <Heading
                  as='h5'
                  fontSize='18px'
                  noOfLines={2}
                  size='md'
                  pb='5px'
                  gridColumn='1'
                  lineHeight='45px'
                >
                  {detail.nama}
                </Heading>
                <Heading
                  as='h6'
                  fontSize='14px'
                  noOfLines={1}
                  size='md'
                  pb='4px'
                  gridColumn='2'
                  textAlign='right'
                  lineHeight='45px'
                  gridRow='0'
                >
                  <Highlight
                    query={detail.jumlahKalori.toFixed(2) + 'g'}
                    styles={{ px: '2', py: '2', rounded: 'full', bg: Color.ONE, fg: 'white'}}>
                      {detail.jumlahKalori.toFixed(2) + 'g'}
                  </Highlight>
                </Heading>

              </Grid>
              <Grid templateColumns='repeat(2, 1fr)' width='50%'>
                <Text fontSize='sm' isTruncated color='gray.700'>
                    {'Lemak'}
                </Text>
                <Text fontSize='sm' isTruncated color='gray.700'>
                    {': '+detail.jumlahLemak.toFixed(2)+'g'}
                </Text>
                <Text fontSize='sm' isTruncated color='gray.700'>
                    {'Karbohidrat'}
                </Text>
                <Text fontSize='sm' isTruncated color='gray.700'>
                    {': '+detail.jumlahKarbohidrat.toFixed(2)+'g'}
                </Text>
                <Text fontSize='sm' isTruncated color='gray.700'>
                    {'Protein'}
                </Text>
                <Text fontSize='sm' isTruncated color='gray.700'>
                    {': '+detail.jumlahProtein.toFixed(2)+'g'}
                </Text>
              </Grid>
      
            </Stack>
          ))}
        </Collapse>
      </Card>
    </>
  );
};

export default MakananDikonsumsiBox;
