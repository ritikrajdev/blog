import React from 'react';
import { render, waitFor } from '@testing-library/react';

import HomePage from '..';
import { makeRequest } from '../../../utils/makeRequest';
import { mockedBlogData } from '../../../constants/mockedData';
import { useNavigate } from 'react-router-dom';
import { PostsContext } from '../../../contexts/blogContext';

jest.mock('react-router-dom');
jest.mock('../../../utils/makeRequest');

const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
const mockMakeRequest = makeRequest as jest.MockedFunction<typeof makeRequest>;

mockUseNavigate.mockReturnValue(jest.fn());

describe('HomePage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading when initially rendered', async () => {
    mockMakeRequest.mockResolvedValue([]);
    const mockPostContextValue = {
      posts: undefined,
      setPosts: jest.fn(),
    };

    const screen = render(
      <PostsContext.Provider value={mockPostContextValue}>
        <HomePage />
      </PostsContext.Provider>,
    );

    const loadingNode = screen.getByText('Loading...');
    expect(loadingNode).toBeTruthy();
    expect(screen.asFragment()).toMatchSnapshot();

    await waitFor(() => {
      expect(mockPostContextValue.setPosts).toHaveBeenCalled();
    });
  });

  it('should display 2 cards', async () => {
    mockMakeRequest.mockResolvedValue(mockedBlogData);
    const mockPostContextValue = {
      posts: mockedBlogData,
      setPosts: jest.fn(),
    };

    const screen = render(
      <PostsContext.Provider value={mockPostContextValue}>
        <HomePage />
      </PostsContext.Provider>,
    );
    await waitFor(() => {
      const cardContainer = screen.getByTestId('cards');
      expect(cardContainer.childNodes).toHaveLength(2);
    });
  });
});
