import React from 'react';
import { render, waitFor } from '@testing-library/react';

import HomePage from '..';
import { makeRequest } from '../../../utils/makeRequest';
import { mockedBlogData } from '../../../constants/mockedData';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom');
jest.mock('../../../utils/makeRequest');

const mockUseNavigate = useNavigate as jest.MockedFunction<typeof useNavigate>;
const mockMakeRequest = makeRequest as jest.MockedFunction<typeof makeRequest>;

mockUseNavigate.mockReturnValue(jest.fn());

describe('HomePage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading when initially rendered', () => {
    mockMakeRequest.mockResolvedValue([]);

    const screen = render(<HomePage />);
    const loadingNode = screen.getByText('Loading...');
    expect(loadingNode).toBeTruthy();
    expect(screen.asFragment()).toMatchSnapshot();
    waitFor(() => {
      expect(screen.getByTestId('cards')).toBeTruthy();
    });
  });

  it('should display 2 cards', () => {
    mockMakeRequest.mockResolvedValue(mockedBlogData);

    const screen = render(<HomePage />);
    waitFor(() => {
      const cardContainer = screen.getByTestId('cards');
      expect(cardContainer.childNodes).toHaveLength(2);
    });
  });
});
