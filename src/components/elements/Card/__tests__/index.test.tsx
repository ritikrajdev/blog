import React from 'react';

import Card from '..';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { makeRequest } from '../../../../utils/makeRequest';
import { mockPost } from '../../../../constants/mockedData';

jest.mock('../../../../utils/makeRequest');
const mockMakeRequest = makeRequest as jest.MockedFunction<typeof makeRequest>;

describe('Card', () => {
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

  it('should change white heart to red on click', async () => {
    mockMakeRequest.mockResolvedValue({
      data: {
        liked: true,
      },
    });

    const screen = render(<Card {...mockPost} />);
    const whiteHeart = screen.getByAltText('/assets/icons/heart-black.svg');
    fireEvent.click(whiteHeart);
    await waitFor(() => {
      const redHeart = screen.getByAltText('/assets/icons/heart-red.svg');
      expect(redHeart).toBeTruthy();
    });
  });

  it('should not toggle heart on click when any network error occours', async () => {
    mockMakeRequest.mockRejectedValue({});

    const screen = render(<Card {...mockPost} />);
    const whiteHeart = () =>
      screen.getByAltText('/assets/icons/heart-black.svg');

    fireEvent.click(whiteHeart());
    await waitFor(() => {
      expect(whiteHeart).toBeTruthy();
    });
  });

  it('should increment claps on clapButton click', async () => {
    mockMakeRequest.mockResolvedValue({ data: { claps: mockPost.claps + 1 } });

    const screen = render(<Card {...mockPost} />);
    const numClapsNode = screen.getByText(mockPost.claps);
    const clapsIconNode = screen.getByAltText('/assets/icons/clapping.svg');

    expect(numClapsNode.textContent).toBe(String(mockPost.claps));
    fireEvent.click(clapsIconNode);
    await waitFor(() => {
      expect(numClapsNode.textContent).toBe(String(mockPost.claps + 1));
    });
  });

  it('should not toggle claps on clapButton click when any network error occours', async () => {
    mockMakeRequest.mockRejectedValue({});

    const screen = render(<Card {...mockPost} />);
    const numClapsNode = screen.getByText(mockPost.claps);
    const clapsIconNode = screen.getByAltText('/assets/icons/clapping.svg');

    expect(numClapsNode.textContent).toBe(String(mockPost.claps));
    fireEvent.click(clapsIconNode);
    await waitFor(() => {
      expect(numClapsNode.textContent).toBe(String(mockPost.claps));
    });
  });
});
