import React from 'react'

import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Text ,Stack,Heading,Box,StackDivider,Image,Button,Divider,ButtonGroup} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
function SingleCommPost({item}) {
    const number=item.rating;
    const temp=[];
    for(var i=0; i<number; i++){
        temp.push(<span><BsStarFill color='gold'/></span>);

    }
    console.log(temp)
   
  return (
<div>
    
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
        {item.adress}
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
      <Button variant='solid' colorScheme='teal'>
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