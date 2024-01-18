import React from 'react'

import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'

function ChatBotPoliceComplaint() {
  return (
    <div className='text-[#8c4e1d] tex-md'>
        <h1>Filing A Police Complaint</h1>
        <OrderedList>
            <ListItem>Visit your Nearest Police station</ListItem>
            <ListItem>Find a guide at the Police Station</ListItem>
            <ListItem>Explain him/her your problem in detail</ListItem>
            <ListItem>File a FIR,and take FIR id from the Concerned inspector</ListItem>
        </OrderedList>
   </div>
  )
}

export default ChatBotPoliceComplaint