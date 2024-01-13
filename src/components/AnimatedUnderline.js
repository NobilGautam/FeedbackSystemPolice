import React, { useState } from 'react';

const AnimatedUnderline = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  const underlineStyle = {
    position: 'relative',
    display: 'inline-block',
  };

  const spanStyle = {
    zIndex: 1,
    position: 'relative',
    paddingBottom: '8px',
  };

  const lineStyle = {
    position: 'absolute',
    top: '120%',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: '#FFFFFF',
    transformOrigin: 'bottom left',
    transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
    transition: 'transform 0.5s ease-in-out',
  };

  return (
    <div
      style={underlineStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={spanStyle}>
        {text}
      </span>
      <span style={lineStyle} />
    </div>
  );
};

export default AnimatedUnderline;

