import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div className=' w-[80%] mx-auto mt-36 text-center text-3xl '>
    <div >
      UNAUTHORISED ACCESS !!
   
    </div>
    <Link to="/">
    <Button colorScheme='teal' className='mt-5'>Back to Home</Button>
    </Link>
    </div>
  )
}

export default Error