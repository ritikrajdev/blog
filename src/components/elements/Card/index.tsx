import React from 'react';
import IconButton from '../IconButton';

import './Card.css';

export default function Card({
  image,
  date,
  readingTime,
  title,
  claps,
  liked,
  description,
  imgAlt = '',
}: {
  image: string;
  date: string;
  readingTime: string;
  imgAlt?: string;
  title: string;
  claps: number;
  liked: boolean;
  description: string;
}) {
  const [isLiked, setIsLiked] = React.useState(liked);

  const heartSrc = isLiked
    ? '/assets/icons/heart-red.svg'
    : '/assets/icons/heart-black.svg';

  return (
    <div className='card'>
      <img src={image} alt={imgAlt} className='card-img' />

      <p className='card-meta-info card-padding'>
        <span>{readingTime}</span>
        <span>{date}</span>
      </p>

      <h3 className='card-title card-padding'>{title}</h3>
      <p className='card-content card-padding'>{description}</p>

      <div className='vertical-spacer'></div>

      <hr className='card-margin' />
      <div className='card-padding card-actions'>
        <div className='card-actions'>
          <IconButton iconPath='/assets/icons/clapping.svg' />
          <span>{claps}</span>
        </div>

        <div className='card-actions'>
          <IconButton
            iconPath={heartSrc}
            onClick={(e: React.MouseEvent) => {
              setIsLiked(!isLiked);
            }}
          />
        </div>
      </div>
    </div>
  );
}
