import React from 'react';

interface LogoProps {
  maxWidth: string;
}

const Logo: React.FC<LogoProps> = ({ maxWidth = '100px' }) => {
  return (
    <img
      src="/assets/logo4.png"
      alt="Logo"
      style={{ maxWidth }}  // Using inline styles for dynamic maxWidth
    />
  );
};

export default Logo;
