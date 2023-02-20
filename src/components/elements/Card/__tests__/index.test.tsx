import React from 'react';
import { describe, it } from '@jest/globals';

import Card from '..';
import { fireEvent, render } from '@testing-library/react';

describe('Card', () => {
  const mockPost = {
    date: '2nd Januray, 2018',
    readingTime: '2 mins',
    title: 'The future of abstract art and the culture ...',
    description:
      'Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your...',
    claps: 10,
    liked: false,
    image: 'abstract.png',
  };
  it('should render with white heart if not liked', () => {
    const screen = render(<Card {...mockPost} />);
    expect(screen.getByAltText('/assets/icons/heart-black.svg')).toBeTruthy();
  });

  it('should change white heart to red on click', () => {
    const screen = render(<Card {...mockPost} />);
    const whiteHeart = screen.getByAltText('/assets/icons/heart-black.svg');
    fireEvent.click(whiteHeart);
    const redHeart = screen.getByAltText('/assets/icons/heart-red.svg');
    expect(redHeart).toBeTruthy();
  });

  it('should toggle heart on click', () => {
    const screen = render(<Card {...mockPost} />);
    const whiteHeart = () =>
      screen.getByAltText('/assets/icons/heart-black.svg');
    fireEvent.click(whiteHeart());
    const redHeart = () => screen.getByAltText('/assets/icons/heart-red.svg');
    expect(redHeart).toBeTruthy();
    fireEvent.click(redHeart());
    expect(whiteHeart()).toBeTruthy();
  });
});
