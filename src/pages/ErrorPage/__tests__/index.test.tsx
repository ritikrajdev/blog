import React from 'react';
import ErrorPage from '..';
import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom');
const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe('ErrorPage', () => {
  it('should render correctly without param', () => {
    mockUseParams.mockReturnValue({});
    const screen = render(<ErrorPage />);
    expect(screen.asFragment()).toMatchSnapshot();
  });

  it('should render errorCode correctly with correct param', () => {
    mockUseParams.mockReturnValue({ errorCode: '123' });
    const screen = render(<ErrorPage />);

    const errorCodeContainer = screen.getByTestId('error-code-container');
    expect(errorCodeContainer).toBeTruthy();

    expect(errorCodeContainer.textContent).toContain('123');

    expect(screen.asFragment()).toMatchSnapshot();
  });

  it('should render errorCode correctly with incorrect param', () => {
    mockUseParams.mockReturnValue({ errorCode: '123x' });
    const screen = render(<ErrorPage />);

    const errorCodeContainer = screen.queryByTestId('error-code-container');
    expect(errorCodeContainer).toBeFalsy();

    expect(screen.asFragment()).toMatchSnapshot();
  });
});
