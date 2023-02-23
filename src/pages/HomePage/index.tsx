import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/elements/Card';
import { GET_ALL_BLOGS } from '../../constants/apiEndpoints/blog';

import { makeRequest } from '../../utils/makeRequest';

import './HomePage.css';
import { PostsContext } from '../../contexts/blogContext';

export default function HomePage() {
  const navigate = useNavigate();
  // actually no need of it !!
  const { posts, setPosts } = useContext(PostsContext);

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
