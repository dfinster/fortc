import React from 'react';

interface ImgFlexProps {
  src: string;
  darksrc?: string;
  alt?: string;
  style?: React.CSSProperties;
}

const ImgFlex: React.FC<ImgFlexProps> = ({ src, darksrc, alt = '', style }) => {
  console.log('ImgFlex src is:', src); // Debugging statement
  return <img src={src} alt={darksrc} />;
};

export default ImgFlex;
