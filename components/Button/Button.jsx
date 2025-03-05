import React from 'react';


const Button = ({ className, placeholder, variant, onClick, children }) => {
    const baseClasses = 'px-[18px] py-[8px] rounded-[3px] inline-flex items-center justify-center font-semibold transition-colors';
    const variantClasses = variant === 'white' 
      ? 'bg-white text-[#f08e80] hover:bg-gray-100'
      : 'bg-[#f08e80] text-white hover:bg-[#ccc]';
  
    return (
      <button type='submit' onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
        {placeholder}
        {children}
      </button>
    );
  };

export default Button;