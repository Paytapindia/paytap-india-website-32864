import React from 'react';

interface NPCIIconProps {
  className?: string;
  size?: number;
}

export const NPCIIcon: React.FC<NPCIIconProps> = ({ className = "", size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Network nodes background circle */}
      <circle cx="24" cy="24" r="20" fill="#059669" stroke="#059669" strokeWidth="1"/>
      
      {/* Central hub */}
      <circle cx="24" cy="24" r="4" fill="#ffffff"/>
      
      {/* Network nodes */}
      <circle cx="12" cy="16" r="2.5" fill="#ffffff"/>
      <circle cx="36" cy="16" r="2.5" fill="#ffffff"/>
      <circle cx="12" cy="32" r="2.5" fill="#ffffff"/>
      <circle cx="36" cy="32" r="2.5" fill="#ffffff"/>
      <circle cx="24" cy="8" r="2.5" fill="#ffffff"/>
      <circle cx="24" cy="40" r="2.5" fill="#ffffff"/>
      
      {/* Connecting lines */}
      <line x1="24" y1="24" x2="12" y2="16" stroke="#ffffff" strokeWidth="2"/>
      <line x1="24" y1="24" x2="36" y2="16" stroke="#ffffff" strokeWidth="2"/>
      <line x1="24" y1="24" x2="12" y2="32" stroke="#ffffff" strokeWidth="2"/>
      <line x1="24" y1="24" x2="36" y2="32" stroke="#ffffff" strokeWidth="2"/>
      <line x1="24" y1="24" x2="24" y2="8" stroke="#ffffff" strokeWidth="2"/>
      <line x1="24" y1="24" x2="24" y2="40" stroke="#ffffff" strokeWidth="2"/>
      
      {/* Payment waves */}
      <path d="M16 24C18 22 20 22 22 24" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
      <path d="M26 24C28 22 30 22 32 24" stroke="#ffffff" strokeWidth="1.5" fill="none"/>
    </svg>
  );
};