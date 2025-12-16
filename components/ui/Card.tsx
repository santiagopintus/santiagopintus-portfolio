import React from 'react';

const Card = ({
  title,
  cardBody,
  isWhite = false,
  customStyles = '',
}: {
  title?: string;
  isWhite?: boolean;
  cardBody: React.ReactNode;
  customStyles?: string;
}) => {
  return (
    <div
      className={`p-6 ${isWhite ? 'bg-white text-dark-bg' : 'bg-transparent text-gray-400'} border border-white/20 rounded-4xl ${customStyles}`}
    >
      {title && <h3 className={`text-xl mb-4`}>{title}</h3>}
      <div className="text-sm space-y-1 font-mono leading-loose">{cardBody}</div>
    </div>
  );
};

export default Card;
