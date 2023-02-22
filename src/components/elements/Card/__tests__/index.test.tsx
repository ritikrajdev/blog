import React from 'react';
import { describe, it } from '@jest/globals';

import Card from '..';
import { fireEvent, render, waitFor } from '@testing-library/react';
// import * as requests from '../../../../utils/makeRequest';

describe('Card', () => {
  const mockPost = {
    id: 1,
    date: '2nd Januray, 2018',
    // eslint-disable-next-line camelcase
    reading_time: '2 mins',
    title: 'The future of abstract art and the culture ...',
    description:
      'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your...',
    claps: 10,
    liked: false,
    image: 'abstract.png',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correct data', () => {
    const screen = render(<Card {...mockPost} />);
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it('should render with white heart if not liked', () => {
    const screen = render(<Card {...mockPost} />);
    expect(screen.getByAltText('/assets/icons/heart-black.svg')).toBeTruthy();
  });

  it('should change white heart to red on click', () => {
    jest.mock('../../../../utils/makeRequest', () => ({
      makeRequest: jest.fn().mockResolvedValue({
        data: {
          liked: true,
        },
      }),
    }));

    const screen = render(<Card {...mockPost} />);
    const whiteHeart = screen.getByAltText('/assets/icons/heart-black.svg');
    fireEvent.click(whiteHeart);
    waitFor(() => {
      const redHeart = screen.getByAltText('/assets/icons/heart-red.svg');
      expect(redHeart).toBeTruthy();
    });
  });

  it('should toggle heart on click', () => {
    jest.mock('../../../../utils/makeRequest', () => ({
      makeRequest: jest.fn().mockResolvedValue({
        data: {
          liked: true,
        },
      }),
    }));

    const screen = render(<Card {...mockPost} />);
    const whiteHeart = () =>
      screen.getByAltText('/assets/icons/heart-black.svg');
    fireEvent.click(whiteHeart());
    waitFor(() => {
      const redHeart = () => screen.getByAltText('/assets/icons/heart-red.svg');
      expect(redHeart).toBeTruthy();
      fireEvent.click(redHeart());
      waitFor(() => {
        expect(whiteHeart()).toBeTruthy();
      });
    });
  });

  it('should toggle claps on clapButton click', () => {
    jest.mock('../../../../utils/makeRequest', () => ({
      makeRequest: jest.fn().mockResolvedValue({}),
    }));

    const screen = render(<Card {...mockPost} />);
    const numClapsNode = screen.getByText(mockPost.claps);
    const clapsIconNode = screen.getByAltText('/assets/icons/clapping.svg');

    expect(numClapsNode.textContent).toBe(String(mockPost.claps));
    fireEvent.click(clapsIconNode);
    waitFor(() => {
      expect(numClapsNode.textContent).toBe(String(mockPost.claps + 1));
      fireEvent.click(clapsIconNode);
      waitFor(() => {
        expect(numClapsNode.textContent).toBe(String(mockPost.claps));
      });
    });
  });
});
