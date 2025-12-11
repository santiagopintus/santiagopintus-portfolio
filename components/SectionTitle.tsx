import React from 'react';

interface SectionTitleProps {
  children: React.ReactNode;
  centered?: boolean;
  spacing?: 'normal' | 'large';
  className?: string;
  id?: string;
}

export default function SectionTitle({
  children,
  centered = false,
  spacing = 'normal',
  className = '',
  id,
}: SectionTitleProps) {
  const baseClasses = 'text-2xl md:text-4xl font-mono';
  const spacingClasses = spacing === 'large' ? 'mb-16' : 'mb-8';
  const alignmentClasses = centered ? 'text-center' : '';

  const combinedClasses = [baseClasses, spacingClasses, alignmentClasses, className]
    .filter(Boolean)
    .join(' ');

  return (
    <h2 id={id} className={combinedClasses}>
      ./{children}
    </h2>
  );
}
