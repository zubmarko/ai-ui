import React from 'react';
import './index.css';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="relative flex items-center tooltip">
      {children}
      <span className="tooltiptext absolute invisible bg-gray-900 text-white text-xs rounded py-1 px-4 right-0 bottom-full mb-2 opacity-0 transition-opacity duration-300">
        {text}
      </span>
    </div>
  );
};

export default Tooltip;
