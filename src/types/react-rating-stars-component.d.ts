declare module 'react-rating-stars-component' {
    import * as React from 'react';
  
    interface ReactStarsProps {
      count?: number;
      value?: number;
      onChange?: (newRating: number) => void;
      size?: number;
      isHalf?: boolean;
      emptyIcon?: React.ReactNode;
      halfIcon?: React.ReactNode;
      filledIcon?: React.ReactNode;
      color?: string;
      activeColor?: string;
      edit?: boolean;
    }
  
    const ReactStars: React.FC<ReactStarsProps>;
  
    export default ReactStars;
  }
  