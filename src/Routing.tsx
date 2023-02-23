import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ErrorPage from './pages/ErrorPage';

import * as routes from './constants/routes';
import PageNotFound from './pages/PageNotFound';
import PostContextProvider from './contexts/blogContext';

export default function Routing() {
  return (
    <Routes>
      <Route
        element={
          <PostContextProvider>
            <HomePage />
          </PostContextProvider>
        }
        path={routes.HOME_PAGE_ROUTE}
      />
      <Route
        element={<ErrorPage />}
        path={`${routes.ERROR_PAGE_ROUTE}/:errorCode?`}
      />
      <Route element={<PageNotFound />} path={'*'} />
    </Routes>
  );
}
