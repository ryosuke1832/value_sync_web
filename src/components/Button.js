import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  disabled = false
}) {
  const baseStyles = "font-bold py-2 px-4 rounded transition-all duration-200";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 active:scale-95",
    secondary: "bg-gray-500 text-white hover:bg-gray-600 active:scale-95",
    outline: "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 active:scale-95"
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? disabledStyles : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}