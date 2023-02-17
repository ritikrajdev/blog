import React from 'react';
import Card from '../../components/elements/Card';

import posts from '../../constants/mockData.json';

import './HomePage.css';

export default function HomePage() {
  posts.forEach((post, idx) => {
    if (!post.image.startsWith('/assets/images/')) {
      posts[idx].image = '/assets/images/' + post.image;
    }
  });

  return (
    <div className='body-padding home-page'>
      {posts.map((post, idx) => (
        <Card key={idx} {...post} />
      ))}
    </div>
  );
}
