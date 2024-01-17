import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router';
import { Auth } from '../Firebase';
import { useSupabase } from "../context/SupabaseContext";
import { decrypt } from 'n-krypta';
import { MessageList, Input, Button, MessageBox } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css'; // Import the styles
import { Avatar } from 'react-chat-elements';
import userAvatar from '../assets/userAvatar.png';
import rpico from '../assets/rplogo.png';
import { Textarea } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';


const FeedbackThread = () => {
    const { documentID } = useParams();
    const [user] = useAuthState(Auth);
    const { fetchVisits, visits } = useSupabase();
    const [loading, setLoading] = useState(true);
    const [senderMessage, setSenderMessage] = useState("");
    const [receiverMessage, setReceiverMessage] = useState('');
    const [submit, setSubmit] = useState(false);
    const [chat, setChat] = useState('');
    const [temp, setTemp] = useState('');
    const toast = useToast();
  
    useEffect(() => {
      const getFeedback = async () => {
        setLoading(true);
        await fetchVisits(false, documentID);
        setLoading(false);
      }
      getFeedback();
    }, []);

    useEffect(() => {
        if (loading === false) {
            setSenderMessage(decrypt(visits[0].feedback, toString(process.env.REACT_APP_SECRET_KEY)))
            setReceiverMessage(visits[0].comment)
            console.log(receiverMessage);
        }
    }, [loading])
    
    const handleChange = (e) => {
        setTemp(e.target.value);
    }
  
    return (
        <div className='flex justify-center'>
          <div className='mt-36 w-[60%]'>
            {loading ? (
              <p>Loading</p>
            ) : (
                <div className='flex flex-col justify-between h-[80vh]'>
                    <div className='flex flex-col gap-2 items-center w-full'>
                        <div className='flex flex-row w-[100%] justify-start gap-4'>
                        <Avatar src={user.photoURL} size='xlarge' className=' rounded-full'/>
                        <MessageBox 
                            position='left'
                            title='You'
                            type='text'
                            text={senderMessage}
                            date={new Date()}
                            className='mt-7 max-w-[50%]'
                        />
                        </div>
                        {
                            receiverMessage === '' ? (
                                <></>
                            ) : (
                                <div className='flex flex-row w-[100%] justify-end gap-4'>
                                <MessageBox 
                                    position='right'
                                    title='Rajasthan Police'
                                    type='text'
                                    text={receiverMessage}
                                    date={new Date()}
                                    className='mt-7 max-w-[50%]'
                                />
                        <Avatar src={rpico} size='xlarge' className=' rounded-full'/>
                        </div>
                            )
                        }
                        {submit ?
                            <div className='flex flex-row w-[100%] justify-start gap-4'>
                            <Avatar src={user.photoURL} size='xlarge' className=' rounded-full'/>
                            <MessageBox 
                                position='left'
                                title='You'
                                type='text'
                                text={chat}
                                date={new Date()}
                                className='mt-7 max-w-[50%]'
                            />
                            </div>
                            :
                            <></>
                        }
                    </div>
                    <div className='bg-white rounded-2xl w-[100%] flex flex-col justify-center items-center'>
                        <Textarea value={temp} className='border-[2px] border-black rounded-xl my-2 mx-20 max-w-[90%]' placeholder='Now talking with Rajasthan Police' onChange={handleChange}/>
                        <button className='bg-[#ed9a55] p-2 rounded-xl my-3 font-semibold w-[100px] hover:bg-[#965d2f] duration-300'
                            onClick={() => {
                                setTemp('');
                                setSubmit(true);
                                if (submit) {
                                    toast({
                                      title: 'Reply Submitted',
                                      description: "Wait for Rajasthan Police's reply",
                                      status: 'info',
                                      duration: 5000,
                                      isClosable: true,
                                    });
                                } else {
                                    setChat(temp);
                                }
                            }}
                        >REPLY</button>
                    </div>
                </div>                
            )}
          </div>
        </div>
      );
  }
  
  export default FeedbackThread;
  