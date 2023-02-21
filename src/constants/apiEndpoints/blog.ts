import { ApiEndpoint } from '../../types/apiEndpoint';

export const BASE_URL = 'http://localhost:8080';

export const GET_ALL_BLOGS: ApiEndpoint = {
  method: 'GET',
  url: `${BASE_URL}/blog-posts`,
};

export const PUT_BLOG = (id: number | string): ApiEndpoint => ({
  method: 'PUT',
  url: `${BASE_URL}/blog-posts/${id}`,
});
