import React from 'react'
import { useParams } from 'react-router'
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Single() {
  const {id}=useParams();
  console.log(id);
  return (
    <div>
      <Link to='/'>
      <Button colorScheme='teal'>Back to All Posts</Button>
      </Link>
    </div>
  )
}

export default Single