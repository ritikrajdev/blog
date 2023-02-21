import { AxiosResponse } from 'axios';
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
          <IconButton
            iconPath='/assets/icons/clapping.svg'
            onClick={async () => {
              const newChangeClap = !changeClap;
              const newNumClaps = claps + (newChangeClap ? 1 : 0);

              const responseData = await makeRequest(PUT_BLOG(id), {
                data: {
                  claps: newNumClaps,
                },
              });

              setChangeClaps(newChangeClap);
            }}
          />
          <span>{numClaps}</span>
        </div>

        <div className='card-actions'>
          <IconButton
            iconPath={heartSrc}
            onClick={async () => {
              const response: AxiosResponse = await makeRequest(PUT_BLOG(id), {
                data: {
                  liked: !isLiked,
                },
              });
              setIsLiked(response.data.liked);
            }}
          />
        </div>
      </div>
    </div>
  );
}
