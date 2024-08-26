import React from 'react';

const FillButton = ({ children, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        body-md-semi
        text-white
        bg-base
        rounded-full
        border
        border-base
        hover:bg-background
        hover:text-base
        focus:outline-none
        focus:ring-1
        focus:ring-base
     
        w-[164px] 
        h-[45px]
        ${className}
      `}
    >
      <span className="body-md-medium">
        {children}
      </span>
    </button>
  );
};

export default FillButton;
