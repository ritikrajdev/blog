import React from 'react';
import { render } from '@testing-library/react';
import PageNotFound from '..';

describe('PageNotFound', () => {
  it('should render correctly', () => {
    const screen = render(<PageNotFound />);
    expect(screen.asFragment()).toMatchSnapshot();
  });
});
