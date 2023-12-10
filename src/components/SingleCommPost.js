import React from 'react'

import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import { Text ,Stack,Heading,Box,StackDivider,Image,Button,Divider,ButtonGroup} from '@chakra-ui/react'
import { Link } from 'react-router-dom'
function SingleCommPost({item}) {
   
  return (
<div>
<Card maxW='sm'>
  <CardBody>
    <Image
      src={item.image}
      borderRadius='sm'
    />
    <Stack mt='2' spacing='2'>
      <Heading size='md'>{item.name}</Heading>
      <Text>
        This sofa is perfect for modern tropical spaces, baroque inspired
        spaces, 
      </Text>
      <Text color='blue.600' fontSize='md'>
        {item.adress}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
    <ButtonGroup>
    <Link to={`/single/${item.id}`}>
      <Button variant='solid' colorScheme='blue'>
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