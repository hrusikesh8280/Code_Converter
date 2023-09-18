import React from 'react';

const ConversionResult = ({ title, result }) => {
  return (
    <div className="conversion-result">
      <h2>{title}</h2>
      <pre>{result}</pre>
    </div>
  );
};

export default ConversionResult;
