import React from 'react';

interface RBIIconProps {
  className?: string;
  size?: number;
}

export const RBIIcon: React.FC<RBIIconProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Shield background */}
      <path
        d="M24 4L6 12V22C6 33.046 14.954 42 24 42C33.046 42 42 33.046 42 22V12L24 4Z"
        fill="#1e40af"
        stroke="#1e40af"
        strokeWidth="1"
      />
      
      {/* Bank building */}
      <rect x="14" y="18" width="20" height="18" fill="#ffffff" rx="1"/>
      
      {/* Columns */}
      <rect x="16" y="20" width="2" height="14" fill="#1e40af"/>
      <rect x="20" y="20" width="2" height="14" fill="#1e40af"/>
      <rect x="24" y="20" width="2" height="14" fill="#1e40af"/>
      <rect x="28" y="20" width="2" height="14" fill="#1e40af"/>
      <rect x="32" y="20" width="2" height="14" fill="#1e40af"/>
      
      {/* Roof */}
      <path d="M14 18L24 14L34 18H14Z" fill="#1e40af"/>
      
      {/* RBI text */}
      <text x="24" y="30" textAnchor="middle" fill="#1e40af" fontSize="6" fontWeight="bold" fontFamily="sans-serif">RBI</text>
    </svg>
  );
};