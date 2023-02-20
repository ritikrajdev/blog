import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import IconButton from '..';

describe('IconButton', () => {
  it('should call the function provided on click', () => {
    const mockOnClick = jest.fn();
    const mockIconPath = 'test';
    const screen = render(
      <IconButton iconPath={mockIconPath} onClick={mockOnClick} />,
    );
    const iconButton = screen.getByAltText(mockIconPath);
    fireEvent.click(iconButton);
    expect(mockOnClick).toBeCalled();
  });
});
