/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "../index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function SingleFeedbackPost({ item, ImgLinks, addressLinks }) {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div data-aos="fade-up">
      <div className="flex justify-center my-8 min-h-max max-h-max lg:hover:scale-105 duration-300">
        <div className="flex lg:flex-row w-[80%] flex-col lg:justify-between rounded-lg overflow-hidden shadow-md shadow-[#8e8e8e9a] bg-[#f6bd85]">
          <div className="flex lg:flex-row flex-col w-[100%] lg:justify-between lg:items-center lg:w-[30%]">
            <img
              src={ImgLinks.get(item.policeStation)}
              className="lg:w-[80%] lg:h-[100%] aspect-[16/9] object-cover"
              alt={`${item.name} Police Station Picture`}
            ></img>
            <h2 className="text-[1.2rem] mt-2 ml-0 md:mt-0 md:ml-8 font-bold text-center w-[100%]">
              {item.policeStation}
            </h2>
          </div>
          <div className="flex text-center items-center mt-2 md:mt-0 lg:text-[1.2rem] font-light justify-center lg:w-[40%]">
            {addressLinks.get(item.policeStation)}
          </div>
          <div
            className={`flex items-center min-h-max bg-zinc-50 p-4 mt-2 md:mt-0 font-light lg:w-[30%] justify-center ${
              item.Feel < 0 ? "text-red-600" : "text-green-700"
            }`}
          >
            {item.feedback}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleFeedbackPost;
