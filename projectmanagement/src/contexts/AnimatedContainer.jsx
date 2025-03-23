import React from 'react';
import { cn } from '@/lib/utils';

const AnimatedContainer = ({
  children,
  className,
  delay = 0,
  animation = 'fade-in',
}) => {
  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-up':
        return 'animate-slide-up';
      case 'slide-down':
        return 'animate-slide-down';
      case 'scale-up':
        return 'animate-scale-up';
      default:
        return 'animate-fade-in';
    }
  };

  return (
    <div
      className={cn(getAnimationClass(), className)}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;