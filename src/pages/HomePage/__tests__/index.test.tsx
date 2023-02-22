import React from 'react';
import { render, waitFor } from '@testing-library/react';

import HomePage from '..';

const mockData = [
  {
    id: 2,
    date: '2023-01-01T07:46:22.001Z',
    // eslint-disable-next-line camelcase
    reading_time: '1 min',
    title: 'How painting outdoors can transform your',
    description:
      'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your readers for more. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas laoreet nibh euismod vestibulum.',
    claps: 1,
    liked: true,
    image: 'https://i.ibb.co/8cDkQkS/outdoor.png',
  },
  {
    id: 3,
    date: '2023-02-20T21:00:00.001Z',
    // eslint-disable-next-line camelcase
    reading_time: '2 mins',
    title: '10 young painters you need to know',
    description:
      'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your readers for more. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas laoreet nibh euismod vestibulum.',
    claps: 15,
    liked: false,
    image: 'https://i.ibb.co/V38cHQ3/young-painters.png',
  },
];

// FIXME: showing axios error if both tests are present
describe('HomePage', () => {
  jest.mock('../../../utils/makeRequest', () => ({
    makeRequest: jest.fn().mockResolvedValue(mockData),
  }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading when initially rendered', () => {
    const screen = render(<HomePage />);
    const loadingNode = screen.getByText('Loading...');
    expect(loadingNode).toBeTruthy();
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it('should display 2 cards', () => {
    const screen = render(<HomePage />);
    waitFor(() => {
      const cardContainer = screen.getByTestId('cards');
      expect(cardContainer.childNodes).toHaveLength(2);
    });
  });
});
