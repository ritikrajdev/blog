import React, { createContext, useState } from 'react';
import { Post } from '../types/post';

interface PostContextType {
  posts: Post[] | undefined;
  setPosts: React.Dispatch<React.SetStateAction<Post[] | undefined>>;
}

export const PostsContext = createContext<PostContextType>({
  posts: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPosts() {},
});

export default function PostContextProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [posts, setPosts] = useState<Post[] | undefined>(undefined);
  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
}
