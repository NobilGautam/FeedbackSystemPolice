/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import '../index.css'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function SingleVisitPost({ item, ImgLinks, addressLinks, documentId }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = timestamp ? new Date(timestamp.seconds * 1000) : null;

    if (date) {
      const formattedDate = date.toLocaleDateString();
      const formattedTime = date.toLocaleTimeString();
      return `${formattedDate} ${formattedTime}`;
    }

    return 'N/A';
  };

  return (
    < div data-aos='fade-up' >
    <div className='flex justify-center my-8 min-h-max max-h-max lg:hover:scale-105 duration-300'>
      <div className='flex lg:flex-row w-[80%] flex-col lg:justify-between rounded-lg overflow-hidden shadow-md shadow-[#8e8e8e9a] bg-[#f6bd85]'>
        <div className='flex lg:flex-row flex-col w-[100%] lg:justify-between lg:items-center lg:w-[30%]'>
          <img src={ImgLinks.get(item.policeStation)} className='lg:w-[80%] lg:h-[100%] aspect-[16/9] object-cover' alt={`${item.name} Police Station Picture`}></img>
          <h2 className='text-[1.2rem] mt-2 ml-0 md:mt-0 md:ml-8 font-bold text-center w-[100%]'>{item.policeStation}</h2>
        </div>
        <div className='flex text-center items-center mt-2 md:mt-0 lg:text-[1.2rem] font-light justify-center lg:w-[40%]'>
          {addressLinks.get(item.policeStation)}
        </div>
        <div className='flex items-center mt-2 md:mt-0 lg:w-[30%] justify-center'>
          <p className="font-light text-sm">
            {formatTimestamp(item.timeStamp)}
          </p>
        </div>
        <div>
            <Link to={`/newFeedback/${documentId}`}>Add Feedback</Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SingleVisitPost;