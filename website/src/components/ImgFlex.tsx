import React from 'react';

interface ImgFlexProps {
  src: string;
  alt?: string;
  style?: React.CSSProperties;
}

const ImgFlex: React.FC<ImgFlexProps> = ({ src, alt = '', style }) => {
  console.log('ImgFlex src is:', src); // Debugging statement
  return <img src={src} alt={alt} />;
};

export default ImgFlex;
