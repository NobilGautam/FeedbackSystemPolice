import React from 'react'

const ImageCard = ({ children, ImgSrc, ...props }) => {
    return (
      <div
        {...props}
        className="relative max-w-s overflow-hidden rounded-xl shadow-lg group"
      >
        <img
          src={ImgSrc}
          alt="Police Pic"
          className="transition-transform group-hover:scale-110 duration-200"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/90 to-transparent">
          <div style={{ display: 'flex', width: '100%' }} className="p-5 text-white">{children}</div>
        </div>
      </div>
    );
  };

export default ImageCard