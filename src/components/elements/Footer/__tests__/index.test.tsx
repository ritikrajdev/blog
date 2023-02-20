import { render } from '@testing-library/react';
import React from 'react';
import Footer from '..';

describe('Footer', () => {
  it('should render correctly', () => {
    const screen = render(<Footer />);
    expect(screen.asFragment()).toMatchSnapshot();
  });
});
