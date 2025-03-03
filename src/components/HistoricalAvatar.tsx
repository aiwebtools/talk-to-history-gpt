
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { type HistoricalFigure } from '@/lib/constants';

interface HistoricalAvatarProps {
  figure: HistoricalFigure;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

const HistoricalAvatar: React.FC<HistoricalAvatarProps> = ({
  figure,
  size = 'md',
  isSelected = false,
  onClick,
  className,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden cursor-pointer transition-all duration-300',
        sizeClasses[size],
        isSelected && 'ring-4 ring-primary ring-offset-2',
        !imageLoaded && 'bg-muted animate-pulse',
        onClick && 'hover:scale-105',
        className
      )}
      onClick={onClick}
    >
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <img
        src={figure.image}
        alt={figure.name}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setImageLoaded(true)}
      />
      {isSelected && (
        <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary rounded-full border-2 border-white flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

export default HistoricalAvatar;
