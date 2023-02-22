import React from 'react';
import { useParams } from 'react-router-dom';

export default function ErrorPage() {
  const { errorCode } = useParams();
  const _errorCode = isNaN(Number(errorCode)) ? undefined : errorCode;

  return (
    <div style={{ textAlign: 'center' }}>
      <p>Oh No ! Something went wrong</p>
      {_errorCode && (
        <p data-testid='error-code-container'>
          A Error Occoured with Error Code {_errorCode}
        </p>
      )}
    </div>
  );
}
