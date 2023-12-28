import React from 'react'
import { useEffect } from 'react'

import { Card, CardBody, CardFooter } from '@chakra-ui/react'
import { Text ,Stack,Heading,Image,Button,Divider,ButtonGroup} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BsStarFill } from 'react-icons/bs'
import AOS from 'aos'
import 'aos/dist/aos.css'

function SingleCommPost({item}) {
    const number=item.rating;
    const temp=[];
    for(var i=0; i<number; i++){
        temp.push(<span><BsStarFill color='gold'/></span>);
    }
    useEffect(()=>{
      AOS.init({duration:1000});
  },[]);
  
  
  return (
  <div data-aos="fade-up">
  <Card maxW='sm'>
    <CardBody>
      <Image
        src={item.image}
        borderRadius='sm'
      />
      <Stack mt='1' spacing='1'>
        <Heading size='md'>{item.name}</Heading>
        <Text>
          This sofa is perfect for modern trical spaces, baroque inspired
          spaces, 
        </Text>
        <Text color='blue.600' fontSize='sm'>
          {item.address}
        </Text>
        <Text color='blue.600' fontSize='sm' className='flex'>
          {temp.map((item)=>{return <span>{item}</span>})}
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup>
      <Link to={`/single/${item.id}`}>
        <Button variant='solid' bg="#F4BC77">
        View more
        </Button>
      </Link>
      </ButtonGroup>
    </CardFooter>
  </Card>
  </div>
  )
}

export default SingleCommPost