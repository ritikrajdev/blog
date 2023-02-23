import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/elements/Card';
import { GET_ALL_BLOGS } from '../../constants/apiEndpoints/blog';

import { makeRequest } from '../../utils/makeRequest';

import { Post } from '../../types/post';

import './HomePage.css';

export default function HomePage() {
  const [posts, setPosts] = React.useState<Post[] | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    makeRequest(GET_ALL_BLOGS, {}, navigate).then((data) => {
      setPosts(data);
    });
  }, []);

  if (posts === undefined)
    return <div className='body-padding home-page'>Loading...</div>;

  return (
    <div className='body-padding home-page' data-testid='cards'>
      {posts.map((post, idx) => (
        <Card key={idx} {...post} />
      ))}
    </div>
  );
}
