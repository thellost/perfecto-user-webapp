import React from 'react';


interface ButtonProps {
  className?: string;
  placeholder?: React.ReactNode;
  variant?: 'white' | string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ className, placeholder, variant, onClick, children }) => {
    const baseClasses = 'px-[18px] py-[8px] rounded-[3px] inline-flex items-center cursor-pointer justify-center font-semibold transition-colors';
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