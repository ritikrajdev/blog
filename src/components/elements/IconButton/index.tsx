import React from 'react';

export default function IconButton({
  iconPath,
  onClick,
  size = 24,
}: {
  iconPath: string;
  onClick?: (e: React.MouseEvent) => void;
  size?: number;
}) {
  return (
    <img
      src={iconPath}
      alt={iconPath}
      className='card-actions-icon'
      width={size}
      height={size}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    />
  );
}
