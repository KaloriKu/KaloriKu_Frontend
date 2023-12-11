import { Color } from "@/common/Style";
import { ArtikelData } from "@/common/types/ArtikelData";
import { Card, Stack, Heading, Text, Grid, Link } from "@chakra-ui/react";

interface ArtikelCardProps {
    artikel: ArtikelData
  }

const ArtikelCard: React.FC<ArtikelCardProps> = ({ artikel }) => {
  const truncatedText = artikel.isiArtikel.trim().substring(0,300).split(" ").join(" ")+"..."

    return (
        <>
          <Card
            minW='250px'
            minH='200px'
            _hover={{
              bg: "orange.100",
              transform: 'scale(1.005)',
              transitionDuration: '0.1s',
              transitionTimingFunction: "ease-in-out",
            }}
            cursor='pointer'
            variant={'outline'}
            borderColor={Color.ONE}
            >
            <Stack m='2' spacing='1' p='8px' justify='space-between'>
              <Link href={`artikel/${artikel.id}`}>
              <Heading fontSize='20px' noOfLines={2} size='md' pb='5px'>{artikel.judulArtikel}</Heading>  
              {(()=>{
                  if (artikel.isiArtikel.length < 300) return  <Text fontSize='16px' color='gray.700'>{artikel.isiArtikel} </Text>                
                  else if (artikel.isiArtikel.length > 300) return <Text fontSize='16px' color='gray.700'> {truncatedText}</Text>          
                  })()}

              </Link>
            </Stack>
          </Card>
        </>
      )
    }
    
    export default ArtikelCard;
  

  