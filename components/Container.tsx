import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'nav' | 'header' | 'footer';
}

export default function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component className={`w-[90%] max-w-[120rem] mx-auto ${className}`}>
      {children}
    </Component>
  );
}
