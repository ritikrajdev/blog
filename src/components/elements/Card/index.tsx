import React, { useState } from 'react';
import { PUT_BLOG } from '../../../constants/apiEndpoints/blog';
import { makeRequest } from '../../../utils/makeRequest';
import IconButton from '../IconButton';

import './Card.css';

export default function Card({
  id,
  image,
  date,
  reading_time: readingTime,
  title,
  claps,
  liked,
  description,
  imgAlt = '',
}: {
  id: string | number;
  image: string;
  date: string;
  reading_time: string;
  imgAlt?: string;
  title: string;
  claps: number;
  liked: boolean;
  description: string;
}) {
  const [isLiked, setIsLiked] = useState(liked);
  const [changeClap, setChangeClaps] = useState(false);

  const heartSrc = isLiked
    ? '/assets/icons/heart-red.svg'
    : '/assets/icons/heart-black.svg';

  const numClaps = claps + (changeClap ? 1 : 0);

  const _date = new Date(date);
  const formattedDate = _date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className='card'>
      <img src={image} alt={imgAlt} className='card-img' />

      <p className='card-meta-info card-padding'>
        <span>{readingTime}</span>
        <span>{formattedDate}</span>
      </p>

      <h3 className='card-title card-padding'>{title}</h3>
      <p className='card-content card-padding'>{description}</p>

      <div className='vertical-spacer'></div>

      <hr className='card-margin' />
      <div className='card-padding card-actions'>
        <div className='card-actions'>
          <IconButton
            iconPath='/assets/icons/clapping.svg'
            onClick={async () => {
              let newChangeClap = !changeClap;
              const newNumClaps = claps + (newChangeClap ? 1 : 0);

              try {
                await makeRequest(PUT_BLOG(id), {
                  data: {
                    claps: newNumClaps,
                  },
                });
              } catch (e) {
                // show some snacbar or anything else
                newChangeClap = changeClap;
              }

              setChangeClaps(newChangeClap);
            }}
          />
          <span>{numClaps}</span>
        </div>

        <div className='card-actions'>
          <IconButton
            iconPath={heartSrc}
            onClick={async () => {
              try {
                const response = await makeRequest(PUT_BLOG(id), {
                  data: {
                    liked: !isLiked,
                  },
                });
                setIsLiked(response.data.liked);
              } catch (e) {
                // show snackbar
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
