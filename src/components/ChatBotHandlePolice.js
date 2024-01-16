import React from 'react'
import { Button } from "@chakra-ui/react";
import { IoDownloadOutline } from "react-icons/io5";
import { useState } from 'react';
import { set } from 'lodash';

function ChatBotHandlePolice({previousStep}) {
    console.log(previousStep);
    const [status, setStatus] = useState("Connecting to server...");
    const [download,setDownload]=useState(true);
    const handleClick = async () => {
       try{
        setDownload(false);
        const data = await fetch(
            `https://flask-api-render-gzze.onrender.com/fetch_stats?send_email=false&ps=${previousStep.message}`
          );
    
          setStatus("Creating file...");
    
          const blob = await data.blob();
          const url = window.URL.createObjectURL(new Blob([blob]));
    
          const a = document.createElement("a");
          a.href = url;
          a.download = `${previousStep.message}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
    
          setStatus("Download complete!");
          setDownload(false);

       }
       catch(e){
        console.log(e);

       }
      };

  return (
    <div>
        <h3>Your download is just One click away</h3>
        {download?<Button className="customButton mt-5" onClick={handleClick}>
        <IoDownloadOutline />
        <span className="ml-2">Download Detailed PDF</span>
      </Button>
:status}
        
    </div>
  )
}

export default ChatBotHandlePolice