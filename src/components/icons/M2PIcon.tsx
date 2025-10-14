import React from 'react';

interface M2PIconProps {
  className?: string;
  size?: number;
}

export const M2PIcon: React.FC<M2PIconProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tech infrastructure background */}
      <rect x="4" y="4" width="40" height="40" rx="8" fill="#10b981" stroke="#10b981" strokeWidth="1"/>
      
      {/* Server/Infrastructure lines */}
      <rect x="8" y="12" width="32" height="2" fill="#ffffff" rx="1"/>
      <rect x="8" y="16" width="32" height="2" fill="#ffffff" rx="1"/>
      <rect x="8" y="20" width="32" height="2" fill="#ffffff" rx="1"/>
      <rect x="8" y="28" width="32" height="2" fill="#ffffff" rx="1"/>
      <rect x="8" y="32" width="32" height="2" fill="#ffffff" rx="1"/>
      <rect x="8" y="36" width="32" height="2" fill="#ffffff" rx="1"/>
      
      {/* Connectivity dots */}
      <circle cx="12" cy="13" r="1" fill="#10b981"/>
      <circle cx="16" cy="13" r="1" fill="#10b981"/>
      <circle cx="12" cy="17" r="1" fill="#10b981"/>
      <circle cx="16" cy="17" r="1" fill="#10b981"/>
      <circle cx="12" cy="21" r="1" fill="#10b981"/>
      <circle cx="16" cy="21" r="1" fill="#10b981"/>
      
      <circle cx="32" cy="29" r="1" fill="#10b981"/>
      <circle cx="36" cy="29" r="1" fill="#10b981"/>
      <circle cx="32" cy="33" r="1" fill="#10b981"/>
      <circle cx="36" cy="33" r="1" fill="#10b981"/>
      <circle cx="32" cy="37" r="1" fill="#10b981"/>
      <circle cx="36" cy="37" r="1" fill="#10b981"/>
      
      {/* M2P text */}
      <text x="24" y="27" textAnchor="middle" fill="#ffffff" fontSize="8" fontWeight="bold" fontFamily="sans-serif">M2P</text>
    </svg>
  );
};