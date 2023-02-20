import React from 'react';
import { describe, expect } from '@jest/globals';
import { render } from '@testing-library/react';

import Navbar from '..';

describe('Navbar', () => {
  it('should render correctly', () => {
    const screen = render(<Navbar />);
    expect(screen.asFragment()).toMatchSnapshot();
  });
});
